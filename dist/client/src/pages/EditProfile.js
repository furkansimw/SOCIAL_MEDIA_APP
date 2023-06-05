"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const profile_1 = require("../api/profile");
const PostPopup_1 = require("../components/PostPopup");
const react_toastify_1 = require("react-toastify");
const LoadingBox_1 = __importDefault(require("../components/LoadingBox"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_redux_2 = require("react-redux");
const profileReducer_1 = require("../redux/profileReducer");
const EditProfile = () => {
    (0, react_1.useEffect)(() => {
        (0, profile_1.accountDetail)().then((v) => {
            setValues(v);
            setTimeout(() => {
                setChanged(false);
            }, 1);
        });
    }, []);
    const [values, setValues] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const nav = (0, react_router_dom_1.useNavigate)();
    const onSubmit = (e) => {
        var _a;
        e.preventDefault();
        if (!changed)
            return;
        const bio = ((_a = values === null || values === void 0 ? void 0 : values.bio) !== null && _a !== void 0 ? _a : "").replace(/\n{2,}/g, "\n").trim();
        var a = values;
        a["bio"] = bio;
        delete a.pp;
        (0, profile_1.updateProfile)(a)
            .then(() => {
            dispatch((0, profile_1.getMyProfile)());
            nav(`/${a.username}`, { replace: true });
            window.location.reload();
        })
            .catch(react_toastify_1.toast.error);
    };
    (0, react_1.useEffect)(() => {
        setChanged(true);
    }, [values]);
    const [changed, setChanged] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (values == null)
            return;
        const { bio } = values;
        if (!bio || bio.trim().length == 0)
            return;
        var timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            if ((bio || "").trim().length > 0)
                setValues(Object.assign(Object.assign({}, values), { bio: bio.replace(/\n{2,}/g, "\n").trim() }));
        }, 5000);
        return () => clearTimeout(timer);
    }, [values === null || values === void 0 ? void 0 : values.bio]);
    const onChangeF = (e) => setValues(Object.assign(Object.assign({}, values), { fullname: e.target.value }));
    const onChangeU = (e) => setValues(Object.assign(Object.assign({}, values), { username: e.target.value.toLowerCase() }));
    const onChangeBio = (e) => setValues(Object.assign(Object.assign({}, values), { bio: e.target.value }));
    const onChangeEmail = (e) => setValues(Object.assign(Object.assign({}, values), { email: e.target.value }));
    const onChangeInBox = (e) => setValues(Object.assign(Object.assign({}, values), { ispublic: e.target.checked }));
    const conv = (file) => new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(reader.error);
        };
    });
    const [p, sP] = (0, react_1.useState)(false);
    const close = () => sP(false);
    const [uploadingpp, setUploadingpp] = (0, react_1.useState)(false);
    const pick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const image = Array.from(e.target.files || []);
        if (image.length == 0)
            return;
        const img = image[0];
        if (!["image/jpeg", "image/jpg", "image/png"].includes(img.type) ||
            img.size >= 5000000)
            return react_toastify_1.toast.error("Image 5mb under must be and type png, jpeg or jpg");
        setUploadingpp(true);
        sP(false);
        conv(img)
            .then((r) => {
            (0, profile_1.updateProfile)({ pp: r })
                .then((url) => {
                setUploadingpp(false);
                const v = values;
                setValues(Object.assign(Object.assign({}, v), { pp: url }));
            })
                .catch((e) => react_toastify_1.toast.error(e.toString()));
        })
            .catch((e) => react_toastify_1.toast.error(e.toString()));
    });
    const remove = () => (0, profile_1.updateProfile)({ pp: null }).then(() => {
        close();
        setValues(Object.assign(Object.assign({}, values), { pp: null }));
        window.location.reload();
    });
    const [pa, _pa] = (0, react_1.useState)(false);
    const { username: myusername } = (0, react_redux_2.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    if (values == null)
        return <></>;
    const { username, fullname, pp, bio, email, ispublic } = values;
    return (<Container>
      <react_toastify_1.ToastContainer position="bottom-center" theme="dark"/>
      <h1 className="settings">Settings</h1>
      <form onSubmit={onSubmit}>
        <p className="title">Edit Profile</p>
        <div className="pp">
          <div className="l">
            {uploadingpp ? (<LoadingBox_1.default />) : (<img src={pp || "/pp.jpg"} alt="pp"/>)}
          </div>
          <div className="t">
            <p>{myusername}</p>
            <button type="button" onClick={() => sP(true)} autoFocus={false} tabIndex={999}>
              {pp ? "Change" : "Upload"} profile photo
              {!pp && (<input onClick={(e) => e.stopPropagation()} type="file" accept="image/jpeg, image/png, image/jpg" name="imageu" id="imageu" onChange={pick}/>)}
            </button>
          </div>
        </div>
        <div className="username">
          <div className="l">
            <p>Fullname</p>
          </div>
          <input type="text" name="username" id="fullname" value={fullname || ""} placeholder="fullname" onChange={onChangeF} maxLength={50}/>
        </div>
        <div className="fullname">
          <div className="l">
            <p>Username</p>
          </div>
          <input type="text" name="username" pattern="^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$" id="username" value={username} placeholder="username" onChange={onChangeU} required/>
        </div>
        <div className="email">
          <div className="l">
            <p>Email</p>
          </div>
          <input value={email} type="email" name="username" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$" id="email" placeholder="email" onChange={onChangeEmail}/>
        </div>
        <div className="bio">
          <div className="l">
            <p className="bio">Bio</p>
          </div>
          <span>
            <textarea placeholder="bio..." name="bio" id="bio" onChange={onChangeBio} value={bio || ""} maxLength={200}></textarea>
            <p>{(bio === null || bio === void 0 ? void 0 : bio.length) || 0} / 200</p>
          </span>
        </div>
        <div className="privacy">
          <div className="l">
            <p>Account Public</p>
          </div>
          <input type="checkbox" checked={ispublic} onChange={onChangeInBox} id="ispublic"/>
        </div>
        <div className="submitspan">
          <div className="l">
            <button onClick={() => _pa(true)} type="button">
              Password Change
            </button>
          </div>
          <input disabled={!changed} className="submit" type="submit" value="Submit"/>
        </div>
      </form>
      {pa && <Pa close={() => _pa(false)}/>}
      {p && <Popup close={close} pick={pick} remove={remove}/>}
    </Container>);
};
const Pa = ({ close }) => {
    return (<>
      <PostPopup_1.Bg onClick={close}/>
      <div className="pas">
        <h1>Password Change</h1>
        <form onSubmit={(e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            const a = e.target;
            const [p, np, npa, adlo] = a;
            const password = p.value;
            const newPassword = np.value;
            const newPasswordAgain = npa.value;
            const anotherDevicesLogout = adlo.checked;
            if (newPassword != newPasswordAgain) {
                react_toastify_1.toast.error("Password not matching");
                npa.select();
                return;
            }
            try {
                yield (0, profile_1.changePassword)(password, newPassword, anotherDevicesLogout);
                react_toastify_1.toast.info("Your password has been changed to successful");
                close();
            }
            catch (error) {
                console.log(error);
                p.select();
                react_toastify_1.toast.error(error.toString());
            }
        })}>
          <input type="password" required minLength={6} maxLength={50} id="oldpassword" placeholder="enter old password"/>
          <input type="password" required id="newpassword" minLength={6} maxLength={50} placeholder="enter new password"/>
          <input type="password" required minLength={6} maxLength={50} id="again" placeholder="again new password"/>
          <div>
            <p>Another devices logout</p>
            <input type="checkbox" defaultChecked name="x" id="logoutcb"/>
          </div>
          <span>
            <button type="submit">Save</button>
          </span>
        </form>
      </div>
    </>);
};
const Popup = ({ close, pick, remove }) => {
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (e.key == "Escape")
                close();
        };
        window.addEventListener("keydown", worker);
        return () => {
            window.removeEventListener("keydown", worker);
        };
    }, []);
    return (<>
      <PostPopup_1.Bg onClick={close}/>
      <div className="popup">
        <h1>Change Profile Photo</h1>
        <button className="u" autoFocus={false} tabIndex={-1}>
          Upload Photo
          <input type="file" accept="image/jpeg, image/png, image/jpg" name="imageu" id="imagequ" onChange={pick}/>
        </button>
        <button className="d" onClick={remove}>
          Remove Current Photo
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </>);
};
const Container = styled_components_1.default.div `
  width: 100%;
  height: 100vh;
  padding: 2rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  .pas {
    width: 400px;
    background-color: #161616;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    height: 400px;
    border-radius: 12px;
    z-index: 200;
    position: fixed;
    padding: 1rem;
    h1 {
      text-align: center;
      font-size: 22px;
      margin-top: 2rem;
      font-weight: 500;
    }
    form {
      border: none;
      input {
        width: 100%;
        border: 1px solid #363636;
        padding: 10px;
        font-size: 14px;
        margin-top: 10px;
        outline: none;
        border-radius: 4px;
        background-color: #141414;
      }
      div {
        margin-top: 1rem;
        display: flex;
        font-size: 14px;
        white-space: nowrap;
        line-height: 18px;
        color: rgb(230, 230, 230);
        input {
          margin: 0px;
          width: 12px;
          margin-left: 10px;
        }
      }
      span {
        display: flex;
        justify-content: center;
        width: 100%;
        button {
          margin-top: 1rem;
          color: #0095f6;
          font-size: 14px;
          font-weight: 600;
          transition: 0.1s ease-in-out all;
          padding: 7px 2rem;
          border-radius: 8px;
          &:hover {
            background-color: #0095f6;
            color: #fafafa;
          }
        }
      }
    }
  }
  .settings {
    font-size: 24px;
    position: absolute;
    left: 2rem;
    top: 2rem;
    font-weight: 600;
  }
  .loading-box {
    width: 2rem;
    height: 2rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
  .popup {
    @keyframes xsxa {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1.2);
      }
    }
    animation: xsxa 0.1 ease-in-out;
    position: fixed;
    width: 400px;
    height: 223px;
    border-radius: 12px;
    background-color: #262626;
    z-index: 200;
    left: calc(50% - 200px);
    top: calc(50% - 110px);

    h1 {
      height: 79px;
      font-size: 20px;
      padding: 2rem 0px 1rem;
      line-height: 15px;
      font-weight: 600;
      text-align: center;
      width: 100%;
    }
    button {
      width: 100%;
      height: 48px;
      font-size: 14px;
      color: #fafafa;
      border-top: 1px solid #363636;
      position: relative;
      input {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      &.u {
        color: #0095f6;
        font-weight: 700;
      }
      &.d {
        font-weight: 700;
        color: #ed4956;
      }
    }
  }
  form {
    border: 1px solid #363636;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    max-height: 700px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #262626;
      &:active {
        background-color: #363636;
        border-radius: 8px;
      }
    }
    .title {
      font-size: 24px;
      margin-bottom: 28px;
      white-space: nowrap;
      width: 120px;
    }
    .l {
      min-width: 120px;
      width: 120px;
      margin-right: 2rem;
      display: flex;
      justify-content: end;
    }

    .pp {
      margin-bottom: 2rem;
      height: 2rem;
      display: flex;
      align-items: start;
      img {
        max-width: 2rem;
        max-height: 2rem;
        object-fit: cover;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
        min-height: 2rem;
        min-width: 2rem;
      }
      .t {
        font-weight: 600;
        line-height: 18px;
      }
      button {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        color: #0095f6;
        white-space: nowrap;
        position: relative;
        cursor: pointer;
        input {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0;
        }
        &:hover {
          color: #f5f5f5;
        }
      }
    }
    .username,
    .fullname {
      margin-bottom: 1rem;
      display: flex;
      input {
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        font-size: 1rem;
        padding: 6px;
        width: 100%;
        line-height: 18px;
      }
    }
    .email {
      margin-bottom: 1rem;
      display: flex;
      input {
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        font-size: 1rem;
        padding: 6px;
        width: 100%;
        line-height: 18px;
      }
    }
    .bio {
      display: flex;
      align-items: start;
      margin-bottom: 1rem;
      .bio {
        font-size: 1rem;
        color: #fafafa;
      }
      span {
        width: 100%;
      }
      textarea {
        width: 100%;
        height: 48px;
        line-height: 18px;
        background-color: #000;
        border: 1px solid #363636;
        border-radius: 3px;
        padding: 6px 10px;
        color: #fafafa;
        max-width: 282px;
        resize: vertical;
        font-size: 1rem;
      }
      p {
        font-size: 12px;
        line-height: 12px;
        margin-top: 4px;
        color: #a8a8a8;
        text-align: start;
      }
    }
    .privacy {
      margin-top: 1rem;
      display: flex;
    }
    .submitspan {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      button {
        color: #0095f6;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          opacity: 0.8;
        }
      }
      .submit {
        padding: 7px 1rem;
        border-radius: 8px;
        font-size: 14px;
        background-color: #0095f6;
        outline: none;
        cursor: pointer;
        border: none;
        &:disabled {
          cursor: default;
          opacity: 0.8;
        }
      }
    }
  }
`;
exports.default = EditProfile;
