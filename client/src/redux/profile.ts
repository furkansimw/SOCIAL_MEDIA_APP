import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CounterState = {
  value: 0,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
