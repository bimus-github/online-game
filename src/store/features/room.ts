import { createSlice } from "@reduxjs/toolkit";
import { Room_Type } from "../../type";

// Define the initial state using that type
const initialState: Room_Type[] = [];

export const roomSlice = createSlice({
  name: "room",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createRoom: (_, action: { payload: Room_Type }) => {
      return [..._, action.payload];
    },
    deleteRoom: (state, action: { payload: string }) => {
      return state.filter((room) => room.id !== action.payload);
    },
    setRooms: (_, __: { payload: Room_Type[] }) => {
      return __.payload;
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
