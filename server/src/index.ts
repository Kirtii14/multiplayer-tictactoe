import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
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

  socket.on("create-game", () => {
    const gameId = socket.id;
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

  socket.on("join-game", ({ gameId }) => {
    const game = games.get(gameId);
    if (!game) return;
    if (game.players.length >= 2) return;

    game.players.push({
      id: socket.id,
      symbol: "O",
    });

    socket.join(gameId);
    io.to(gameId).emit("game-started", game);
  });

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
  });

  socket.on("disconnect", () => {
    for (const [gameId, game] of games) {
      if (game.players.some((p) => p.id === socket.id)) {
        games.delete(gameId);
        io.to(gameId).emit("game-ended");
      }
    }
  });
}); 

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
