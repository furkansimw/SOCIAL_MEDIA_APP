import { createSlice } from "@reduxjs/toolkit";
import { IProfileInitialState } from "../interfaces/ISlices";
import { RootState } from "./store";
import { getMyProfile } from "../api/profile";

const init = () => document.cookie.includes("isloggedin=true");

const initialState: IProfileInitialState = {
  isloggedin: init(),
  loginPopupActive: false,
  values: {
    username: "",
    pp: null,
    id: "",
    ncreatedcommentcount: 0,
    npostlikescount: 0,
    nreqcount: 0,
    reqcount: 0,
    unreadmessagescount: 0,
    nfollowcount: 0,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleSetLoginPopupActive: (state) => {
      state.loginPopupActive = !state.loginPopupActive;
    },
    setUpdateValues: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
    setUnreadMessageCount: (state, action) => {
      const t = action.payload;
      const { unreadmessagescount } = state.values;
      if (t == "inc") {
        state.values.unreadmessagescount = unreadmessagescount + 1;
      } else if (t == "dec") {
        state.values.unreadmessagescount = unreadmessagescount - 1;
      } else {
        state.values.unreadmessagescount = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.values = action.payload as any;
    });
  },
});

export const {
  toggleSetLoginPopupActive,
  setUpdateValues,
  setUnreadMessageCount,
} = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;
export const selectValues = (state: RootState) => state.profile.values;
export const selectIsLoggedin = (state: RootState) => state.profile.isloggedin;
export const selectPostPopupActive = (state: RootState) =>
  state.profile.loginPopupActive;

export default profileSlice.reducer;
