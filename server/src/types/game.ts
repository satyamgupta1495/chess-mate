export enum RoomType {
    CREATE = 'create',
    JOIN = 'join'
}

export type TRoomData = {
    type: string;
    roomName: string;
    selectedColor: string;
}

export interface Player {
    id: string;
    color: string;
}

export interface Room {
    players: Player[];
}

export interface IPlayerStats {
    userId: String | any,
    wins?: Number,
    losses?: Number,
    draws?: Number
}

export enum GameOver {
    CHECK_MATE = 'checkmate',
    STALE_MATE = 'stalemate',
    THREE_FOLD_REPETITION = 'three_fold_repetitio',
    INSUFFICIENT_MATERIAL = 'insufficient_material'
}