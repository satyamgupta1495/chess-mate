import { Service } from "typedi";
import { ServiceResponse } from "../types/shared";
import { PlayerStats } from "../models/PlayerStats";
import { IPlayerStats } from "../types/game";

@Service()
export default class StatsService {

    constructor() { }

    public async getPlayerStats(id: string) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
            const stats = await PlayerStats.findOne({ userId: id })

            if (!stats) {
                res.errorMessage = 'User stats not found!';
                return res;
            }
            const totalGame = (stats.wins ?? 0) + (stats.losses ?? 0) + (stats.draws ?? 0);

            res.success = true;
            res.response.result = { ...stats, totalGame: totalGame };
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

    public async createPlayerStats(data: IPlayerStats) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {
            const userExist: any = await PlayerStats.findOne({
                userId: data?.userId
            })

            if (userExist) {
                res.errorMessage = 'Playerstats already exists';
                return res;
            }

            const playerStats = PlayerStats.create(data)

            if (!playerStats) {
                res.errorMessage = 'playerStats cannot be created!';
                return res;
            }
            res.success = true;
            res.response.result = playerStats;
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

    public async updateStats(data: any) {
        const res: ServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: { result: null, count: undefined },
            success: false,
            error: undefined,
        }

        try {

            const playerStatsExist = await PlayerStats.findOne({ userId: data?.userId });

            if (!playerStatsExist) {
                await this.createPlayerStats(data)
            }

            let toupdate = null

            if (data?.wins) {
                toupdate = "wins"
            } else if (data?.draws) {
                toupdate = "draws"
            } else if (data?.losses) {
                toupdate = "losses"
            } else {
                res.errorMessage = 'Bad request';
                return res;
            }

            const stats = await PlayerStats.findOneAndUpdate(
                { userId: data?.userId },
                { $inc: { [toupdate]: 1 } },
                { new: true }
            );

            if (!stats) {
                res.errorMessage = 'User stats cannot be updated!';
                return res;
            }

            res.success = true;
            res.response.result = stats;
            return res;
        } catch (error) {
            res.errorMessage = error.message;
            res.internalError = true;
            res.error = error;
            res.success = false;
            return res;
        }
    }

}