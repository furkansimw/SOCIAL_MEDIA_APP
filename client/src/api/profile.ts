import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";
import { IGetProfilePosts } from "../interfaces/IApi";

export const getMyProfile = createAsyncThunk("/profile/my", () =>
  req("/profile/my")
);

export const getProfile = createAsyncThunk(
  "/profile/:username",
  (username: string) => req(`/profile/${username}`)
);

export const getProfilePosts = createAsyncThunk(
  "/profile/:username/posts",
  ({ username, date, id }: IGetProfilePosts) =>
    req(`/profile/${username}/posts?date=${date}&id=${id}`)
);
