import { Cell_Type, Room_Type } from "../type";

export interface ClientToServerEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: () => void;
  updateCell: ({ cells, id }: { cells: Cell_Type[]; id: string }) => void;
  resetCell: (id: string) => void;
  askForResetCell: (id: string) => void;
  yes: (id: string) => void;
  no: (id: string) => void;
  deleteRoom: (room: Room_Type) => void;
  updateRoom: (room: Room_Type) => void;
}

export interface ServerToClientEvents {
  createRoom: (room: Room_Type) => void;
  conectingWithUserY: (room: Room_Type) => void;
  gettingId: (id: string) => void;
  updateCell: (cells: Cell_Type[]) => void;
  resetCell: () => void;
  askForResetCell: () => void;
  yes: () => void;
  no: () => void;
  deleteRoom: (room: Room_Type) => void;
  updateRoom: (room: Room_Type) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
