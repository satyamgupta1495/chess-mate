import mongoose from "mongoose";

const playerStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    },
    winPercentage: {
        type: Number,
        default: 0
    }
});

export const PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);
