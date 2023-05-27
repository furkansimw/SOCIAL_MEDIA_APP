const loginVal = (username: string, password: string) =>
  username &&
  password &&
  new RegExp(usernamePattern).test(username) &&
  password.length >= 6 &&
  password.length <= 100;

const signUpVal = (
  username: string,
  password: string,
  email: string,
  fullname?: string
) =>
  loginVal(username, password) &&
  email &&
  !["explore", "messages"].includes(username) &&
  new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$").test(email) &&
  fullname
    ? fullname.length <= 50
    : true;

const usernamePattern =
  "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$";

export { loginVal, signUpVal, usernamePattern };
