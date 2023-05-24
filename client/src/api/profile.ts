import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";

export const getMyProfile = createAsyncThunk("/profile/my", () =>
  req("/profile/my")
);
