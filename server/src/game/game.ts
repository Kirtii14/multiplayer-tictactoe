import { GameState, PlayerSymbol } from "./types";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createGame(): GameState {
  return {
    board: Array(9).fill(null),
    currentTurn: "X",
    players: [],
    winner: null,
    status: "waiting",
  };
}

export function makeMove(
  game: GameState,
  index: number,
  symbol: PlayerSymbol
): boolean {
  // 🔒 Validation
  if (game.status !== "playing") return false;
  if (game.winner) return false;
  if (game.currentTurn !== symbol) return false;
  if (index < 0 || index >= 9) return false;
  if (game.board[index] !== null) return false;

  game.board[index] = symbol;

  checkWinner(game);

  if (!game.winner) {
    game.currentTurn = symbol === "X" ? "O" : "X";
  } else {
    game.status = "finished";
  }

  return true;
}

function checkWinner(game: GameState) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (
      game.board[a] &&
      game.board[a] === game.board[b] &&
      game.board[a] === game.board[c]
    ) {
      game.winner = game.board[a];
      return;
    }
  }

  if (game.board.every((cell) => cell !== null)) {
    game.winner = "DRAW";
  }
}


