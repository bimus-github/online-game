import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

// please note that the types are reversed
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "ws://localhost:3001",
  {
    transports: ["websocket"], // Use WebSocket as the transport
    forceNew: true,
  }
);
