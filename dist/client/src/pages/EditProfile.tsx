import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
  accountDetail,
  changePassword,
  getMyProfile,
  updateProfile,
} from "../api/profile";
import { IE } from "../interfaces/IApi";
import { Bg } from "../components/PostPopup";
import { ToastContainer, toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectValues } from "../redux/profileReducer";

const EditProfile = () => {
  useEffect(() => {
    accountDetail().then((v) => {
      setValues(v);
      setTimeout(() => {
        setChanged(false);
      }, 1);
    });
  }, []);

  const [values, setValues] = useState<IE | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!changed) return;
    const bio = (values?.bio ?? "").replace(/\n{2,}/g, "\n").trim();
    var a: any = values;
    a["bio"] = bio;
    delete a.pp;
    updateProfile(a)
      .then(() => {
        dispatch(getMyProfile());
        nav(`/${a.username}`, { replace: true });
        window.location.reload();
      })
      .catch(toast.error);
  };

  useEffect(() => {
    setChanged(true);
  }, [values]);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (values == null) return;
    const { bio } = values;
    if (!bio || bio.trim().length == 0) return;
    var timer: any;
    clearTimeout(timer);

    timer = setTimeout(() => {
      if ((bio || "").trim().length > 0)
        setValues({ ...values, bio: bio.replace(/\n{2,}/g, "\n").trim() });
    }, 5000);

    return () => clearTimeout(timer);
  }, [values?.bio]);
  const onChangeF = (e: any) =>
    setValues({ ...values!, fullname: e.target.value });
  const onChangeU = (e: any) =>
    setValues({ ...values!, username: e.target.value.toLowerCase() });
  const onChangeBio = (e: any) =>
    setValues({ ...values!, bio: e.target.value });
  const onChangeEmail = (e: any) =>
    setValues({ ...values!, email: e.target.value });
  const onChangeInBox = (e: any) =>
    setValues({ ...values!, ispublic: e.target.checked });
  const conv = (file: File) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function () {
        reject(reader.error as any as string);
      };
    });

  const [p, sP] = useState(false);
  const close = () => sP(false);

  const [uploadingpp, setUploadingpp] = useState(false);

  const pick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = Array.from(e.target.files || []);
    if (image.length == 0) return;
    const img = image[0];
    if (
      !["image/jpeg", "image/jpg", "image/png"].includes(img.type) ||
      img.size >= 5000000
    )
      return toast.error("Image 5mb under must be and type png, jpeg or jpg");

    setUploadingpp(true);
    sP(false);
    conv(img)
      .then((r: any) => {
        updateProfile({ pp: r })
          .then((url) => {
            setUploadingpp(false);
            const v = values!;
            setValues({ ...v, pp: url });
          })
          .catch((e) => toast.error(e.toString()));
      })
      .catch((e) => toast.error(e.toString()));
  };

  const remove = () =>
    updateProfile({ pp: null }).then(() => {
      close();
      setValues({ ...values!, pp: null });
      window.location.reload();
    });
  const [pa, _pa] = useState(false);
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  if (values == null) return <></>;
  const { username, fullname, pp, bio, email, ispublic } = values;
  return (
    <Container>
      <ToastContainer position="bottom-center" theme="dark" />
      <h1 className="settings">Settings</h1>
      <form onSubmit={onSubmit}>
        <p className="title">Edit Profile</p>
        <div className="pp">
          <div className="l">
            {uploadingpp ? (
              <LoadingBox />
            ) : (
              <img src={pp || "/pp.jpg"} alt="pp" />
            )}
          </div>
          <div className="t">
            <p>{myusername}</p>
            <button
              type="button"
              onClick={() => sP(true)}
              autoFocus={false}
              tabIndex={999}
            >
              {pp ? "Change" : "Upload"} profile photo
              {!pp && (
                <input
                  onClick={(e) => e.stopPropagation()}
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  name="imageu"
                  id="imageu"
                  onChange={pick}
                />
              )}
            </button>
          </div>
        </div>
        <div className="username">
          <div className="l">
            <p>Fullname</p>
          </div>
          <input
            type="text"
            name="username"
            id="fullname"
            value={fullname || ""}
            placeholder="fullname"
            onChange={onChangeF}
            maxLength={50}
          />
        </div>
        <div className="fullname">
          <div className="l">
            <p>Username</p>
          </div>
          <input
            type="text"
            name="username"
            pattern="^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$"
            id="username"
            value={username}
            placeholder="username"
            onChange={onChangeU}
            required
          />
        </div>
        <div className="email">
          <div className="l">
            <p>Email</p>
          </div>
          <input
            value={email}
            type="email"
            name="username"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
            id="email"
            placeholder="email"
            onChange={onChangeEmail}
          />
        </div>
        <div className="bio">
          <div className="l">
            <p className="bio">Bio</p>
          </div>
          <span>
            <textarea
              placeholder="bio..."
              name="bio"
              id="bio"
              onChange={onChangeBio}
              value={bio || ""}
              maxLength={200}
            ></textarea>
            <p>{bio?.length || 0} / 200</p>
          </span>
        </div>
        <div className="privacy">
          <div className="l">
            <p>Account Public</p>
          </div>
          <input
            type="checkbox"
            checked={ispublic}
            onChange={onChangeInBox}
            id="ispublic"
          />
        </div>
        <div className="submitspan">
          <div className="l">
            <button onClick={() => _pa(true)} type="button">
              Password Change
            </button>
          </div>
          <input
            disabled={!changed}
            className="submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      {pa && <Pa close={() => _pa(false)} />}
      {p && <Popup close={close} pick={pick} remove={remove} />}
    </Container>
  );
};

const Pa: FC<{ close: () => void }> = ({ close }) => {
  return (
    <>
      <Bg onClick={close} />
      <div className="pas">
        <h1>Password Change</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const a = e.target;
            const [p, np, npa, adlo] = a as any;
            const password = p.value;
            const newPassword = np.value;
            const newPasswordAgain = npa.value;
            const anotherDevicesLogout = adlo.checked;
            if (newPassword != newPasswordAgain) {
              toast.error("Password not matching");
              npa.select();
              return;
            }
            try {
              await changePassword(password, newPassword, anotherDevicesLogout);
              toast.info("Your password has been changed to successful");
              close();
            } catch (error) {
              p.select();
              toast.error((error as any).toString());
            }
          }}
        >
          <input
            type="password"
            required
            minLength={6}
            maxLength={50}
            id="oldpassword"
            placeholder="enter old password"
          />
          <input
            type="password"
            required
            id="newpassword"
            minLength={6}
            maxLength={50}
            placeholder="enter new password"
          />
          <input
            type="password"
            required
            minLength={6}
            maxLength={50}
            id="again"
            placeholder="again new password"
          />
          <div>
            <p>Another devices logout</p>
            <input type="checkbox" defaultChecked name="x" id="logoutcb" />
          </div>
          <span>
            <button type="submit">Save</button>
          </span>
        </form>
      </div>
    </>
  );
};

const Popup: FC<{
  close: () => void;
  remove: () => void;
  pick: (e: React.ChangeEvent<HTMLInputElement>) => Promise<any>;
}> = ({ close, pick, remove }) => {
  useEffect(() => {
    const worker = (e: KeyboardEvent) => {
      if (e.key == "Escape") close();
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, []);

  return (
    <>
      <Bg onClick={close} />
      <div className="popup">
        <h1>Change Profile Photo</h1>
        <button className="u" autoFocus={false} tabIndex={-1}>
          Upload Photo
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            name="imageu"
            id="imagequ"
            onChange={pick}
          />
        </button>
        <button className="d" onClick={remove}>
          Remove Current Photo
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </>
  );
};

const Container = styled.div`
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

export default EditProfile;
