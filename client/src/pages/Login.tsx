import { useState, FormEvent, useEffect } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import { ToastContainer, toast } from "react-toastify";
import { login, signup } from "../api/auth";
import { toggleSetIsloggedin } from "../redux/profileSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const usernamePattern =
    "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
  const emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
  const [islogin, setIslogin] = useState(true);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formSubmitForReady, setFormSubmitForReady] = useState(false);

  const formCheckValidity = () => {
    setFormSubmitForReady(false);
    if (!username.match(username)) return;
    if (!islogin && !email.match(emailPattern)) return;
    if (password.length < 6 || username.length < 6) return;
    if (!islogin && fullname.length > 50) return;
    setFormSubmitForReady(true);
  };

  useEffect(() => {
    formCheckValidity();
  }, [username, email, fullname, password, islogin]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (islogin) await login(username, password);
      else await signup(username, password, fullname, email);
      dispatch(toggleSetIsloggedin());
    } catch (error) {
      toast.error((error as any).toString());
    }
  };

  const change = () => setIslogin(!islogin);

  return (
    <Container>
      <Title title={islogin ? "Login" : "Signup"} />
      <ToastContainer theme="dark" position="bottom-center" />
      <h1>Social Media App</h1>
      <form onSubmit={onSubmit}>
        <div className={`input-box ${username && `focus`}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            value={username}
            pattern={usernamePattern}
            required
            minLength={6}
            maxLength={36}
            autoFocus
          />
        </div>
        {!islogin && (
          <>
            <div className={`input-box ${email && `focus`}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                pattern={emailPattern}
                required
              />
            </div>
            <div className={`input-box ${fullname && `focus`}`}>
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                id="fullname"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                maxLength={50}
              />
            </div>
          </>
        )}
        <div className={`input-box ${password && `focus`}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            minLength={6}
            maxLength={100}
          />
        </div>
        <button disabled={!formSubmitForReady} type="submit">
          {islogin ? "Login" : "Signup"}
        </button>
      </form>
      <div className="change">
        <p>
          {islogin ? `Don't have an account? ` : `Have an account? Log in `}
        </p>
        <button onClick={change}>{islogin ? "Signup" : "Login"}</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 350px;
  margin: 2rem;
  border: 1px solid #363636;
  padding: 40px;
  h1 {
    font-size: 26px;
    font-weight: 700;
  }
  form {
    margin-top: 24px;
    .input-box {
      margin-bottom: 8px;
      height: 36px;
      width: 100%;
      position: relative;
      &.focus {
        input {
          padding: 14px 8px 2px;
        }
        label {
          transform: scale(calc(10 / 12)) translateY(-10px);
          left: 4px;
        }
      }
      label {
        top: 8px;
        left: 8px;
        pointer-events: none;
        font-size: 12px;
        color: #a8a8a8;
        position: absolute;
        height: 36px;
        transition: 0.1s ease-in-out all;
      }
      input {
        font-size: 12px;
        border-radius: 3px;
        padding: 9px 8px 7px;
        width: 100%;
        line-height: 18px;
        outline: 1px solid #363636;
        background-color: #121212;
        border: none;
      }
    }
    button {
      font-size: 14px;
      font-weight: 600;
      margin-top: 8px;
      width: 100%;
      padding: 7px 1rem;
      border-radius: 8px;
      color: #fafafa;
      border: none;
      outline: none;
      background-color: #0095f6;
      &:disabled {
        opacity: 0.7;
        cursor: text;
      }
      opacity: 1;
    }
  }
  .change {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    p {
      color: #f5f5f5;
      font-size: 14px;
      margin-right: 4px;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      color: #0095f6;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

export default Login;
