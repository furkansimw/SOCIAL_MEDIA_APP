"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const Title_1 = __importDefault(require("../components/Title"));
const react_toastify_1 = require("react-toastify");
const auth_1 = require("../api/auth");
const Login = () => {
    const usernamePattern = "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$", emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
    const [islogin, setIslogin] = (0, react_1.useState)(true);
    const [username, setUsername] = (0, react_1.useState)("");
    const [fullname, setFullname] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [formSubmitForReady, setFormSubmitForReady] = (0, react_1.useState)(false);
    const formCheckValidity = () => {
        setFormSubmitForReady(false);
        const usernameDone = new RegExp(usernamePattern).test(username);
        const emailDone = new RegExp(emailPattern).test(email);
        if (!usernameDone)
            return;
        if (!islogin && !emailDone)
            return;
        if (password.length < 6 || username.length < 6)
            return;
        if (!islogin && fullname.length > 50)
            return;
        setFormSubmitForReady(true);
    };
    (0, react_1.useEffect)(() => {
        formCheckValidity();
    }, [username, email, fullname, password, islogin]);
    const onSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            if (islogin)
                yield (0, auth_1.login)(username, password);
            else
                yield (0, auth_1.signup)(username, password, fullname, email);
            window.location.reload();
        }
        catch (error) {
            react_toastify_1.toast.error(error.toString());
        }
    });
    const change = () => setIslogin(!islogin);
    return (<Container className="login">
      <Title_1.default title={islogin ? "Login" : "Signup"}/>
      <react_toastify_1.ToastContainer theme="dark" position="bottom-center"/>
      <h1>Social Media App</h1>
      <form onSubmit={onSubmit}>
        <div className={`input-box ${username && `focus`}`}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value.toLowerCase())} value={username} pattern={usernamePattern} required minLength={6} maxLength={36} autoFocus/>
        </div>
        {!islogin && (<>
            <div className={`input-box ${email && `focus`}`}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} pattern={emailPattern} required/>
            </div>
            <div className={`input-box ${fullname && `focus`}`}>
              <label htmlFor="fullname">Fullname</label>
              <input type="text" id="fullname" onChange={(e) => setFullname(e.target.value)} value={fullname} maxLength={50}/>
            </div>
          </>)}
        <div className={`input-box ${password && `focus`}`}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required minLength={6} maxLength={100}/>
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
    </Container>);
};
const Container = styled_components_1.default.div `
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
exports.default = Login;
