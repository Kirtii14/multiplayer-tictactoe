import ComicCard from "./ui/ComicCard";
import SpeechBubble from "./ui/SpeechBubble";
import ComicButton from "./ui/ComicButton";
import CatCharacter from "./ui/CatCharacter";
import RatCharacter from "./ui/RatCharacter";
import Board from "./Board";

import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { GameState, PlayerSymbol } from "../shared/types";

export default function Game() {
  const [game, setGame] = useState<GameState | null>(null);
  const [symbol, setSymbol] = useState<PlayerSymbol | null>(null);
  const [gameId, setGameId] = useState<string>("");
  const [joinId, setJoinId] = useState("");


  useEffect(() => {
    
    socket.connect();

    socket.on("game-created", ({ gameId, symbol, game }) => {
      setGameId(gameId);
      setSymbol(symbol);
      setGame(game);
      console.log("Connected to server:", socket.id);
    });


    socket.on("game-started", (game: GameState) => {
      setGame(game);
    });

    socket.on("game-updated", (game: GameState) => {
       console.log("Game updated:", game);
      setGame(game);
    });

    socket.on("game-ended", (game: GameState) => {
      setGame(game);
    });

    return () => {
     socket.off("game-created");
     socket.off("game-started");
     socket.off("game-updated");
     socket.off("game-ended");
     socket.disconnect();
};

  }, []);

 const handleMove = (index: number) => {
  if (!game || !symbol) return;
  if (game.status !== "playing") return;
  if (game.currentTurn !== symbol) return;

  socket.emit("make-move", {
    gameId,
    index,
  });
};



  if (!game) {
    return (
      <div className="flex flex-col gap-6 items-center">
        <ComicButton onClick={() => socket.emit("create-game")}>
          Create Game
        </ComicButton>
      </div>
    );
  }

  const winner = game.winner;

  return (
    <div className="w-full max-w-xl px-6">
      <ComicCard>
        <SpeechBubble>
          {winner
            ? winner === "DRAW"
              ? "It's a draw!"
              : `Player ${winner} wins!`
            : `Player ${game.currentTurn}'s move`}

            {game.status === "waiting" && (
  <p className="text-sm text-gray-500 text-center mb-4">
    Share this Game ID with your friend: <br />
    <span className="font-mono">{gameId}</span>
  </p>
)}

        </SpeechBubble>

        {/* Characters */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-8">
          <div className="flex flex-col items-center gap-4">
            <CatCharacter
              expression={
                winner === "X"
                  ? "win"
                  : winner === "O"
                  ? "loss"
                  : "normal"
              }
            />
            <p className="font-comic text-lg tracking-wide">
              Player X
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <RatCharacter
              expression={
                winner === "O"
                  ? "win"
                  : winner === "X"
                  ? "loss"
                  : "normal"
              }
            />
            <p className="font-comic text-lg tracking-wide">
              Player O
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Board board={game.board} onMove={handleMove} />
        </div>

        <ComicButton
          onClick={() => socket.emit("create-game")}
          className="w-[240px] mx-auto text-lg"
        >
          New Game
        </ComicButton>

   <div className="flex flex-col items-center gap-2 mt-4">
  <input
    value={joinId}
    onChange={(e) => setJoinId(e.target.value)}
    placeholder="Enter Game ID"
    className="border p-2 rounded"
  />

  <ComicButton
    onClick={() => socket.emit("join-game", { gameId: joinId })}>
    Join Game
  </ComicButton>
</div>

      </ComicCard>
    </div>
  );
}

