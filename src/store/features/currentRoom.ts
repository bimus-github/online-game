import { createSlice } from "@reduxjs/toolkit";
import { Room_Type } from "../../type";

const initialState: Room_Type = {
  id: "",
  name: "",
  description: "",
  password: "",
  date: "",
};

export const currentRoomSlice = createSlice({
  name: "currentRoom",
  initialState,
  reducers: {
    setRoom: (_, action: { payload: Room_Type }) => {
      return action.payload;
    },
    deleteRoom: (_, __) => {
      return {} as Room_Type;
    },
  },
});

export const currentRoomActions = currentRoomSlice.actions;

export default currentRoomSlice.reducer;
