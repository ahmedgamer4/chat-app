import { io } from "socket.io-client";
import { token } from "./auth";

export const socket = io("https://chat-app-dud0.onrender.com/", {
  query: {
    token: token.token,
  },
});
