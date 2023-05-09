import { io } from "socket.io-client";
import { token } from "./auth";

export const socket = io("http://localhost:3000", {
  query: {
    token: token.token,
  },
});
