import { createSlice } from "@reduxjs/toolkit";
import { User_Type } from "../../type";

const initialState: User_Type | Object = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (_, action: { payload: User_Type }) => {
      return action.payload;
    },
    delete: () => {
      return {} as User_Type;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
