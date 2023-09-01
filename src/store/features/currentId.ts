import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

export const currentIdSlice = createSlice({
  name: "currentID",
  initialState,
  reducers: {
    set: (_, action) => {
      return action.payload;
    },
    delete: () => {
      return "";
    },
  },
});

export const currentIdActions = currentIdSlice.actions;

export default currentIdSlice.reducer;
