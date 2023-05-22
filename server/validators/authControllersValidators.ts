const loginVal = (username: string, password: string) =>
  username &&
  password &&
  new RegExp("^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").test(
    username
  ) &&
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
  new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$").test(email) &&
  fullname
    ? fullname.length <= 50
    : true;

export { loginVal, signUpVal };
