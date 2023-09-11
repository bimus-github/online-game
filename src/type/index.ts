export interface Room_Type {
  id: string;
  name: string;
  description: string;
  password: string;
  userX: string;
  userY: string;
  date: Date | string;
  usernameX: string;
  usernameY: string;
  status: STATUS_ENUM;
}

export interface Game_Type {
  id: string;
  usernameX: string;
  usernameY: string;
  winnerName: string;
}

export interface ResultItem {
  usernameX: string;
  usernameY: string;
  numOfUserxAsWinner: number;
  numOfUseryAsWinner: number;
}

export enum STATUS_ENUM {
  EMPTY = "EMPTY",
  BUSY = "BUSY",
}

export enum ERROR_ENUM {
  NONE = 0,
  NAME = 1,
  PASSWORD = 2,
  EMAIL = 3,
  INUSE = 4,
  NOTFOUND = 5,
  NETWORK = 6,
}

export interface User_Type {
  id: string;
  email: string;
  as: PLAYER_ENUM;
}

export enum PLAYER_ENUM {
  NONE = "NONE",
  AS_X = "AS_X",
  AS_O = "AS_O",
}

export enum TURN_TYPE {
  X = "X",
  O = "O",
  START = "START",
  END = "END",
}

export interface Cell_Type {
  id: number;
  value: CELL_VALUE_TYPE;
}

export enum CELL_VALUE_TYPE {
  NULL = "",
  X = "X",
  O = "O",
}

export enum ERROR_TYPE {
  FULL = "Already printed",
  NO = "",
  END = " The game is over!!!",
}

export enum WIN {
  X = "X",
  O = "O",
  NONE = "NONE",
}
