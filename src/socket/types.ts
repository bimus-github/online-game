import { Room_Type } from "../type";

export interface ClientToServerEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  createRoom: (room: Room_Type) => void;
}

export interface ServerToClientEvents {
  createRoom: (room: Room_Type) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
