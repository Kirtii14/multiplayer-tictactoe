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
  const [gameId, setGameId] = useState("");
  const [joinId, setJoinId] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [isBotGame, setIsBotGame] = useState(false);

  // ---------------- SOCKET SETUP ----------------
  useEffect(() => {
    socket.connect();

    socket.on("game-created", ({ gameId, symbol, game }) => {
      setGameId(gameId);
      setSymbol(symbol);
      setGame(game);
    });

    socket.on("game-started", (game: GameState) => {
      setGame(game);
      setAnnouncement(" A challenger enters!");
    });

    socket.on("game-updated", (game: GameState) => {
      setGame(game);
    });

    socket.on("game-ended", (game: GameState) => {
      setGame(game);
      setAnnouncement(" Opponent left the game.");
    });

    socket.on("error", (msg: string) => {
      setAnnouncement(`❌ ${msg}`);
    });

    socket.on("room-full", () => {
      setAnnouncement(" Room is full!");
    });

    return () => {
      socket.off("game-created");
      socket.off("game-started");
      socket.off("game-updated");
      socket.off("game-ended");
      socket.off("error");
      socket.off("room-full");
      socket.disconnect();
    };
  }, []);

  // ---------------- AUTO CLEAR ANNOUNCEMENT ----------------
  useEffect(() => {
    if (!announcement) return;
    const timer = setTimeout(() => setAnnouncement(""), 3000);
    return () => clearTimeout(timer);
  }, [announcement]);

  // ---------------- MOVE HANDLER ----------------
  const handleMove = (index: number) => {
    if (!game || !symbol) return;
    if (game.status !== "playing") return;
    if (game.currentTurn !== symbol) return;
    if (game.board[index] !== null) return;

    
    // Let SERVER handle both multiplayer and bot moves
    socket.emit("make-move", { gameId, index });
  };

  // ---------------- RESET ----------------
  const resetToMenu = () => {
    setGame(null);
    setSymbol(null);
    setGameId("");
    setJoinId("");
    setAnnouncement("");
    setIsBotGame(false);
  };

  // ---------------- CREATE MULTIPLAYER ----------------
  const handleCreateGame = () => {
    resetToMenu();
    socket.emit("create-game");
  };

  // ---------------- PLAY VS BOT ----------------
  const handlePlayBot = () => {
    resetToMenu();
    setIsBotGame(true);

    socket.emit("create-game");

    socket.once("game-created", ({ gameId }) => {
      socket.emit("play-vs-bot", { gameId });
    });
  };

  // ---------------- JOIN GAME ----------------
  const handleJoinGame = () => {
    if (!joinId.trim()) return;

    resetToMenu();
    setGameId(joinId);
    socket.emit("join-game", { gameId: joinId });
  };

  // ---------------- MENU SCREEN ----------------
  if (!game) {
    return (
      <ComicCard>
        <div className="flex flex-col items-center gap-6">

          <div className="flex items-center justify-between w-full gap-10">
            <div className="flex flex-col items-center gap-2">
              <CatCharacter expression="normal" />
              <p className="font-comic text-lg">Pookie Cat</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <RatCharacter expression="normal" />
              <p className="font-comic text-lg">Pookie Rat</p>
            </div>
          </div>

          <ComicButton onClick={handleCreateGame}>
             Create Multiplayer Game
          </ComicButton>

          <ComicButton onClick={handlePlayBot}>
             Play vs Computer
          </ComicButton>

          <div className="flex flex-col items-center gap-2 w-full mt-4">
            <input
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              placeholder="Enter Game ID"
              className="border p-2 rounded w-full text-center"
            />
            <ComicButton
              onClick={handleJoinGame}
              disabled={!joinId.trim()}
            >
               Join Game
            </ComicButton>
          </div>
        </div>
      </ComicCard>
    );
  }

  // ---------------- PLAYING / WAITING SCREEN ----------------
  const winner = game.winner;

  const playerLines = [
  " Your move, legend!",
  " Time to flex your brain cells!",
  " Show them who's boss.",
  " Aim. Strike. Dominate.",
  " Make it dramatic.",
];

const botThinkingLines = [
  " The rat is plotting evil...",
  " 900 IQ calculations happening...",
  " Chaos loading...",
  " Processing villain move...",
  "👀 Suspicious silence...",
];

const opponentThinkingLines = [
  "⏳ Opponent is cooking something...",
  "🤔 Brain.exe is running...",
  " Plot twist incoming...",
  "👁️ They're thinking hard...",
];

const winLines = [
  "🎉 Absolute domination!",
  "🏆 Victory tastes sweet!",
  " 🎀 Hero  prevails!",
  " 💅 Main character energy.",
];

const loseLines = [
  " Villain wins this round...",
  " That hurt.",
  " Tragic backstory unlocked.",
  " Revenge arc begins.",
];

const drawLines = [
  " Legendary draw!",
  " That was intense.",
  " Perfectly balanced chaos.",
  " Nobody wins. Drama wins.",
];

const randomLine = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 sm:px-6">
      <ComicCard>

       <SpeechBubble>
  {announcement && (
    <p className="text-sm mb-2 animate-pulse">
      {announcement}
    </p>
  )}

  {game.status === "waiting" && !isBotGame && (
    <>
      <p className="text-lg font-semibold">
        🕒 Waiting for worthy opponent...
      </p>

      <div className="mt-3 text-center">
        <p className="text-sm text-gray-500">
          Share this Game ID, click the to copy:
        </p>
        <button
          onClick={() =>
            navigator.clipboard.writeText(gameId)
          }
          className="font-mono text-blue-600 underline"
        >
          {gameId}
        </button>
      </div>
    </>
  )}

  {game.status === "playing" && !winner && (
    <p className="text-lg font-semibold">
      {game.currentTurn === symbol
        ? randomLine(playerLines)
        : isBotGame
        ? randomLine(botThinkingLines)
        : randomLine(opponentThinkingLines)}
    </p>
  )}

  {winner && (
    <p className="text-xl font-bold">
      {winner === "DRAW"
        ? randomLine(drawLines)
        : winner === symbol
        ? randomLine(winLines)
        : randomLine(loseLines)}
    </p>
  )}
</SpeechBubble>

        <div className="flex items-center justify-between gap-6 mb-6 mt-6">
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
            <p className="font-comic text-lg">
              {symbol === "X" ? "YOU" : "Player X"}
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
            <p className="font-comic text-lg">
              {symbol === "O" ? "YOU" : "Player O"}
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Board board={game.board} onMove={handleMove} />
        </div>

        <ComicButton
          onClick={resetToMenu}
          className="w-[240px] mx-auto text-lg"
        >
          New Game
        </ComicButton>

      </ComicCard>
    </div>
  );
}