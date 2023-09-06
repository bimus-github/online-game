import { createSlice } from "@reduxjs/toolkit";
import { Game_Type } from "../../type";

const initialState: Game_Type[] = [];

const gameSlices = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (_, action: { payload: Game_Type[] }) => {
      return action.payload;
    },
    addGame: (state, action: { payload: Game_Type }) => {
      return [...state, action.payload];
    },
  },
});

export const gameActions = gameSlices.actions;

export default gameSlices.reducer;
