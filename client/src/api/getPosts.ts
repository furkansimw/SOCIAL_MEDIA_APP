import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";
import { IPosts } from "../interfaces/IApi";

export const posts = createAsyncThunk(
  "/posts",
  ({ explore, offset, sd }: IPosts) =>
    req(`${explore ? `/posts/explore` : `/posts`}?offset=${offset}&sd=${sd}`)
);
