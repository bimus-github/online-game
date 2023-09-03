import { Cell_Type, Room_Type } from "../type";

export interface ClientToServerEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: () => void;
  updateRoom: () => void;
  updateCell: ({ cells, id }: { cells: Cell_Type[]; id: string }) => void;
}

export interface ServerToClientEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: (id: string) => void;
  updateRoom: () => void;
  updateCell: (cells: Cell_Type[]) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
