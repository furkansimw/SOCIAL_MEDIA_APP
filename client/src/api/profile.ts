import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";

type IProfilePosts = {
  username: string;
  offset: number;
  sd?: string;
};

export const getMyProfile = createAsyncThunk("/profile/my", () =>
  req("/profile/my")
);

export const getProfile = createAsyncThunk(
  "/profile/:username",
  (username: string) => req(`/profile/${username}`)
);

export const getProfilePosts = createAsyncThunk(
  "/profile/:username/posts",
  ({ username, offset, sd }: IProfilePosts) =>
    req(`/profile/${username}/posts?offset=${offset}&sd=${sd}`)
);
