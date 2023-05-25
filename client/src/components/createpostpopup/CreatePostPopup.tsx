import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
} from "react";
import styled from "styled-components";
import DiscardPopup from "./DiscardPopup";
import PickImage from "./PickImage";
import { ToastContainer, toast } from "react-toastify";
import { LeftArrowIcon } from "../Icons";
import CreatePostPopupImages from "./CreatePostPopupImages";
import { createPost } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../LoadingBox";

type Props = {
  close: () => void;
};

type IPickImage = {
  src: string;
  index: string;
};

const CreatePostPopup: FC<Props> = ({ close }) => {
  const [discardPopup, setDiscardPopup] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const cancel = () => setDiscardPopup(false);
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<IPickImage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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

  const parser = (img: File) =>
    img.size <= 5000000 && ["image/jpeg", "image/png"].includes(img.type);

  const pickFirst10 = (e: File, index: number) => index < 10;

  const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const _files = Array.from(e.target.files ?? []);
    if (_files.length == 0) return;
    console.log(_files);
    const updatedImages = _files.filter(parser).filter(pickFirst10);
    if (_files.length != updatedImages.length)
      toast.info("First 10 image or size 5mb under image");

    if (updatedImages.length > 0) setStep(2);

    const i = await Promise.all(
      updatedImages.map(async (ui, index) => {
        const src = (await conv(ui)) as string;
        const a: IPickImage = { index: index.toString(), src };
        return a;
      })
    );
    setImages(i);
  };

  const extraPick = async (e: ChangeEvent<HTMLInputElement>) => {};

  const back = () => {
    if (step == 2) {
      setIsBack(true);
      setDiscardPopup(true);
    } else setStep(step - 1);
  };

  const nav = useNavigate();

  const next = async () => {
    if (step == 3) {
      const updatedText =
        text?.trim().length > 0
          ? text.trim().replace(/\n\s*\n/g, "\n\n")
          : null;

      const updatedImages = images.map((img) => img.src);

      try {
        setLoading(true);
        const postId = await createPost(updatedImages, updatedText);
        close();
        nav(`/p${postId}`);
      } catch (error) {
        toast.error((error as any).toString());
      } finally {
        setLoading(false);
      }
    } else setStep(step + 1);
  };

  const closeIn = () => {
    setIsBack(false);
    if (step > 1) setDiscardPopup(true);
    else close();
  };

  const closeDiscard = () => {
    if (isBack) {
      setStep(1);
      setDiscardPopup(false);
    } else close();
  };

  return (
    <>
      <Bg onClick={closeIn} />
      <Container className={step == 3 ? "exp" : ""}>
        <ToastContainer position="bottom-center" theme="dark" />
        <div className="header">
          {step > 1 && (
            <button onClick={back} className="back">
              <LeftArrowIcon />
            </button>
          )}
          <p>{step == 1 ? "Pick image" : "Create new post"}</p>
          {step > 1 && (
            <button onClick={next} className="next">
              Next
            </button>
          )}
        </div>
        <div className="content">
          {step == 1 ? (
            <PickImage pick={pick} />
          ) : (
            <CreatePostPopupImages
              extraPick={extraPick}
              text={text}
              setText={setText}
              textAreaIsActive={step == 3}
            />
          )}
          {loading && <LoadingBox />}
        </div>
        {discardPopup && (
          <DiscardPopup cancel={cancel} discard={closeDiscard} />
        )}
      </Container>
    </>
  );
};

const Bg = styled.div`
  position: fixed;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0px;
  top: 0px;
  cursor: pointer;
`;

const Container = styled.div`
  @keyframes scalex {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  transform: scale(0.9);
  animation: 0.1s scalex ease-in-out forwards;
  position: fixed;
  z-index: 50;
  max-width: 700px;
  background-color: #262626;
  left: calc(50vw - 350px);
  top: calc(50vh - 350px);
  max-height: 700px;
  &.exp {
    left: calc(50vw - 550px);
    max-width: 1100px;
    @media screen and (max-width: 1228px) {
      left: 4rem;
      width: calc(100% - 8rem);
    }
  }
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.2s ease all;
  @media screen and (max-height: 828px) {
    top: 4rem;
    height: calc(100% - 8rem);
  }
  @media screen and (max-width: 828px) {
    left: 4rem;
    width: calc(100% - 8rem);
  }
  .header {
    height: 42px;
    border-bottom: 1px solid #363636;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      position: absolute;
      background-color: transparent;
      border: none;
      outline: none;
      color: #fafafa;
      font-size: 14px;
      font-weight: 600;
      &.back {
        left: 20px;
      }
      &.next {
        color: #0095f6;
        right: 20px;
        &:hover {
          color: #e0f1ff;
        }
      }
    }
    p {
      text-align: center;
      font-weight: 600;
    }
  }
  .content {
    height: 100%;
    display: flex;
    width: 100%;
    position: relative;
    .loading-box {
      background-color: #262626;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      .loading-icon {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`;

export default CreatePostPopup;
