import req from "./req";

export const login = (username: string, password: string) =>
  req("/auth/login", "POST", { username, password });

export const signup = (
  username: string,
  password: string,
  fullname: string,
  email: string
) => req("/auth/signup", "POST", { username, password, fullname, email });

export const logout = () => req(`/auth/logout`, `POST`);
