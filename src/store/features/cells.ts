import { createSlice } from "@reduxjs/toolkit";
import { CELL_VALUE_TYPE, Cell_Type } from "../../type";

const initialState: Cell_Type[] = [
  {
    id: 1,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 2,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 3,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 4,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 5,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 6,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 7,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 8,
    value: CELL_VALUE_TYPE.NULL,
  },
  {
    id: 9,
    value: CELL_VALUE_TYPE.NULL,
  },
];

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    set: (_, action: { payload: Cell_Type[] }) => {
      return action.payload;
    },
    reset: () => {
      return [
        {
          id: 1,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 2,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 3,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 4,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 5,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 6,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 7,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 8,
          value: CELL_VALUE_TYPE.NULL,
        },
        {
          id: 9,
          value: CELL_VALUE_TYPE.NULL,
        },
      ];
    },
  },
});

export const cellActions = cellSlice.actions;

export default cellSlice.reducer;
