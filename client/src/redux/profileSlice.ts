import { createSlice } from "@reduxjs/toolkit";
import { IProfileInitialState } from "../interfaces/ISlices";
import { RootState } from "./store";
import { getMyProfile } from "../api/profile";

const init = () => document.cookie.includes("isloggedin=true");

const initialState: IProfileInitialState = {
  isloggedin: init(),
  values: {
    username: "",
    pp: null,
    id: "",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleSetIsloggedin: (state) => {
      state.isloggedin = !state.isloggedin;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.values = action.payload as {
        username: string;
        pp: string | null;
        id: string;
      };
    });
  },
});

export const { toggleSetIsloggedin } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;
export const selectProfileValues = (state: RootState) => state.profile.values;

export default profileSlice.reducer;
