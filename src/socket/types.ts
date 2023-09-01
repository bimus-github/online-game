import { Room_Type } from "../type";

export interface ClientToServerEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: () => void;
}

export interface ServerToClientEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: (id: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
