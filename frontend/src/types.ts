// src/types.ts
export type GameResult = "checkmate" | "stalemate" | null;
export type ChessColor = "white" | "black" | null;

export interface GameOverState {
    isOver: boolean;
    result: GameResult;
    winner: ChessColor;
}

export interface Move {
    move: string;
    score: number | string;
}