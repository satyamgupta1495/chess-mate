export type TPlayedMove = {
    playerColor: string;
    playedMove: {
        currentTurn: string;
        move: Move
    };
};

export type Move = {
    from: string;
    to: string;
    promotion: string;
    color?: 'b' | 'w';
    flags?: string;
    piece?: string;
    san?: string;
}

export type User = {
    userName?: string;
    email?: string;
}