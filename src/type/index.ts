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
}

export enum TURN_TYPE {
  X = "X",
  O = "O",
  START = "START",
  END = "END",
}
