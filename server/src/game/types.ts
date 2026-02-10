export type PlayerSymbol = "X" | "O";

export interface Player {
  id: string;
  symbol: PlayerSymbol;
}

export interface GameState {
  board: (PlayerSymbol | null)[];
  currentTurn: PlayerSymbol;
  players: Player[];
  winner: PlayerSymbol | "DRAW" | null;
}

