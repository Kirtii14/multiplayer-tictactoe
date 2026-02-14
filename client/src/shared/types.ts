export type PlayerSymbol = "X" | "O";

export type GameStatus = "waiting" | "playing" | "finished";

export interface Player {
  id: string;
  symbol: PlayerSymbol;
}

export interface GameState {
  board: (PlayerSymbol | null)[];
  currentTurn: PlayerSymbol;
  players: Player[];
  winner: PlayerSymbol | "DRAW" | null;
  status: GameStatus;
}
