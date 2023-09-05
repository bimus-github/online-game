import { createSlice } from "@reduxjs/toolkit";
import { TURN_TYPE } from "../../type";

const initialState: TURN_TYPE = TURN_TYPE.START as TURN_TYPE;

const turnSlices = createSlice({
  name: "turn",
  initialState,
  reducers: {
    turnX: () => {
      return TURN_TYPE.X;
    },
    turnO: () => {
      return TURN_TYPE.O;
    },
    start: () => {
      return TURN_TYPE.START;
    },
    end: () => {
      return TURN_TYPE.END;
    },
  },
});

export const turnActions = turnSlices.actions;

export default turnSlices.reducer;
