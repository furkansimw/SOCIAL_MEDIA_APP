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
const DiscardPopup_1 = __importDefault(require("./DiscardPopup"));
const PickImage_1 = __importDefault(require("./PickImage"));
const react_toastify_1 = require("react-toastify");
const Icons_1 = require("../Icons");
const CreatePostPopupImages_1 = __importDefault(require("./CreatePostPopupImages"));
const posts_1 = require("../../api/posts");
const react_router_dom_1 = require("react-router-dom");
const LoadingBox_1 = __importDefault(require("../LoadingBox"));
const CreatePostPopup = ({ close }) => {
    const [discardPopup, setDiscardPopup] = (0, react_1.useState)(false);
    const [isBack, setIsBack] = (0, react_1.useState)(false);
    const cancel = () => setDiscardPopup(false);
    const [step, setStep] = (0, react_1.useState)(1);
    const [images, setImages] = (0, react_1.useState)([]);
    const [text, setText] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
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
    const parser = (img) => img.size <= 5000000 &&
        ["image/jpeg", "image/jpg", "image/png"].includes(img.type);
    const pickFirst10 = (_e, index) => index < 10;
    const pick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const _files = Array.isArray(e)
            ? e
            : Array.from((_a = e.target.files) !== null && _a !== void 0 ? _a : []);
        if (_files.length == 0)
            return;
        const updatedImages = _files.filter(parser).filter(pickFirst10);
        if (_files.length != updatedImages.length)
            react_toastify_1.toast.info("First 10 image or size 5mb under image");
        if (updatedImages.length > 0)
            setStep(2);
        const i = yield Promise.all(updatedImages.map((ui, index) => __awaiter(void 0, void 0, void 0, function* () {
            const src = (yield conv(ui));
            const a = { index: index.toString(), src };
            return a;
        })));
        setImages(i);
    });
    const extraPick = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const addedFiles = Array.from((_b = e.target.files) !== null && _b !== void 0 ? _b : []);
        if (addedFiles.length == 0)
            return;
        const updatedAddedImages = addedFiles
            .filter(parser)
            .filter((_, index) => index < 10 - images.length);
        if (addedFiles.length != updatedAddedImages.length)
            react_toastify_1.toast.info(`First ${10 - images.length} image or size 5mb under image`);
        const i = yield Promise.all(updatedAddedImages.map((ui, index) => __awaiter(void 0, void 0, void 0, function* () {
            const src = (yield conv(ui));
            const a = { index: index + images.length.toString(), src };
            return a;
        })));
        setImages([...images, ...i]);
    });
    const back = () => {
        if (step == 2) {
            setIsBack(true);
            setDiscardPopup(true);
        }
        else
            setStep(step - 1);
    };
    const nav = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (images.length == 0)
            setStep(1);
    }, [images]);
    const next = () => __awaiter(void 0, void 0, void 0, function* () {
        if (step == 3) {
            const updatedText = (text === null || text === void 0 ? void 0 : text.trim().length) > 0
                ? text.trim().replace(/\n\s*\n/g, "\n\n")
                : null;
            const updatedImages = images.map((img) => img.src);
            try {
                setLoading(true);
                const postId = yield (0, posts_1.createPost)(updatedImages, updatedText);
                close();
                nav(`/p/${postId}`);
                window.location.reload();
            }
            catch (error) {
                react_toastify_1.toast.error(error.toString());
            }
            finally {
                setLoading(false);
            }
        }
        else
            setStep(step + 1);
    });
    const closeIn = () => {
        setIsBack(false);
        if (step > 1)
            setDiscardPopup(true);
        else
            close();
    };
    const closeDiscard = () => {
        if (isBack) {
            setStep(1);
            setDiscardPopup(false);
        }
        else
            close();
    };
    return (<>
      <Bg onClick={closeIn}/>
      <Container className={step == 3 ? "exp" : ""}>
        <react_toastify_1.ToastContainer position="bottom-center" theme="dark"/>
        <div className="header">
          {step > 1 && (<button onClick={back} className="back">
              <Icons_1.LeftArrowIcon />
            </button>)}
          <p>{step == 1 ? "Pick image" : "Create new post"}</p>
          {step > 1 && (<button onClick={next} className="next">
              Next
            </button>)}
        </div>
        <div className="content">
          {step == 1 ? (<PickImage_1.default pick={pick}/>) : (<CreatePostPopupImages_1.default extraPick={extraPick} text={text} setText={setText} textAreaIsActive={step == 3} images={images} setImages={setImages}/>)}
          {loading && <LoadingBox_1.default />}
        </div>
        {discardPopup && (<DiscardPopup_1.default cancel={cancel} discard={closeDiscard}/>)}
      </Container>
    </>);
};
const Bg = styled_components_1.default.div `
  position: fixed;
  z-index: 70;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  left: 0px;
  top: 0px;
  cursor: pointer;
`;
const Container = styled_components_1.default.div `
  @keyframes scalex {
    0% {
      transform: scale(0.9) translate(initial);
    }
    100% {
      transform: scale(1) translate(initial);
    }
  }
  transform: scale(0.9) translate(initial);
  animation: 0.1s scalex ease-in-out forwards;
  position: fixed;
  z-index: 80;
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
  .loading-box {
    height: 100%;
    position: absolute;
    z-index: 50;
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
    height: calc(100% - 42px);
    display: flex;
    width: 100%;
    position: relative;
    overflow: hidden;
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
exports.default = CreatePostPopup;
