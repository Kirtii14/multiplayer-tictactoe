import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { randomUUID } from "crypto";

import { createGame, makeMove } from "./game/game";
import { GameState } from "./game/types";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const games = new Map<string, GameState>();

io.on("connection", (socket) => {
  console.log("🟢 Player connected:", socket.id);

  // CREATE GAME
  socket.on("create-game", () => {
    const gameId = randomUUID();
    const game = createGame();

    game.players.push({
      id: socket.id,
      symbol: "X",
    });

    games.set(gameId, game);
    socket.join(gameId);

    socket.emit("game-created", {
      gameId,
      symbol: "X",
      game,
    });
  });

  // JOIN GAME
  socket.on("join-game", ({ gameId }) => {
    const game = games.get(gameId);

    if (!game) {
      socket.emit("error", "Game not found");
      return;
    }

    if (game.players.length >= 2) {
      socket.emit("room-full");
      return;
    }

    game.players.push({
      id: socket.id,
      symbol: "O",
    });

    game.status = "playing";
    socket.join(gameId);

    socket.emit("game-created", {
      gameId,
      symbol: "O",
      game,
    });

    io.to(gameId).emit("game-started", game);
  });

  // You VS Bot
  socket.on("play-vs-bot", ({ gameId }) => {
    const game = games.get(gameId);
    if (!game) return;

    if (game.players.length !== 1) return;

    game.players.push({
      id: "BOT",
      symbol: "O",
    });

    game.status = "playing";

    io.to(gameId).emit("game-started", game);
  });

  // MAKE MOVE
  socket.on("make-move", ({ gameId, index }) => {
    const game = games.get(gameId);
    if (!game) return;

    const player = game.players.find(
      (p) => p.id === socket.id
    );

    if (!player) return;

    const success = makeMove(game, index, player.symbol);
    if (!success) return;

    io.to(gameId).emit("game-updated", game);

    // BOT MOVE 
    const botPlayer = game.players.find(
      (p) => p.id === "BOT"
    );

    if (
      botPlayer &&
      game.status === "playing" &&
      game.currentTurn === "O"
    ) {
      const emptyIndexes = game.board
        .map((cell, i) => (cell === null ? i : null))
        .filter((v) => v !== null) as number[];

      if (emptyIndexes.length > 0) {
        const randomIndex =
          emptyIndexes[
            Math.floor(Math.random() * emptyIndexes.length)
          ];

       setTimeout(() => {
       makeMove(game, randomIndex, "O");
       io.to(gameId).emit("game-updated", game);
      }, 1500);
      }
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("🔴 Player disconnected:", socket.id);

    for (const [gameId, game] of games.entries()) {
      const playerIndex = game.players.findIndex(
        (p) => p.id === socket.id
      );

      if (playerIndex !== -1) {
        game.status = "finished";
        game.winner =
          game.players[playerIndex].symbol === "X"
            ? "O"
            : "X";

        io.to(gameId).emit("game-ended", game);
        games.delete(gameId);
      }
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});