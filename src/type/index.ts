export interface Room_Type {
  id: string;
  name: string;
  description: string;
  password: string;
  date: Date;
}

export enum ERROR_ENUM {
  NONE = 0,
  NAME = 1,
}
