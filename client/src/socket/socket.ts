import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://multiplayer-tictactoe-j3gv.onrender.com"
    : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});