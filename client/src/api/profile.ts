import { createAsyncThunk } from "@reduxjs/toolkit";
import req from "./req";
import {
  IGetProfilePosts,
  ISC,
  ILast,
  IFollowRequests,
} from "../interfaces/IApi";
import { INotification } from "../interfaces/ISlices";

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

export const searchProfile = (u: string) =>
  req(`/profile/search?u=${u}`).then((r) => r as any);

export const followUser = createAsyncThunk(
  "/profile/:username/follow~{POST|DELETE}",
  ({ a, userid }: ISC) =>
    req(`/profile/follow`, a ? "POST" : "DELETE", { userid }).then(
      (r: any) => r as 0 | 1
    )
);

export const blockUser = createAsyncThunk(
  "/profile/:username/block~{POST|DELETE}",
  ({ a, userid }: ISC) =>
    req(`/profile/block`, a ? "POST" : "DELETE", { userid })
);

export const accountDetail = () => req(`/profile/edit`).then((r: any) => r);

export const updateProfile = (obj: any) =>
  req(`/profile/edit`, "POST", obj).then((r) => r as string);

export const changePassword = (op: string, np: string, adlo: boolean) =>
  req(`/auth/password`, "POST", { op, np, adlo });

export const notificationsGet = ({ date, id }: ILast) =>
  req(`/profile/notifications?date=${date}&id=${id}`).then(
    (r: any) => r as INotification[]
  );

export const followRequests = ({ date, id, l }: IFollowRequests) =>
  req(`/profile/requests?date=${date}&id=${id}&l=${l}`).then((r: any) => r);
