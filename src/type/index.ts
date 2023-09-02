export interface Room_Type {
  id: string;
  name: string;
  description: string;
  password: string;
  userX: string;
  userY: string;
  turn: TURN_TYPE;
  date: Date | string;
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
