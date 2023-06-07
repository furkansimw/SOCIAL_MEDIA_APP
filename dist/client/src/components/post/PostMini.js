"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const postsReducer_1 = require("../../redux/postsReducer");
const Icons_1 = require("../Icons");
const PostMini = ({ post, back }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { cover, id, likecount, commentcount, more } = post;
    const tap = () => {
        window.history.replaceState(null, "", `/p/${id}`);
        dispatch((0, postsReducer_1.setCurrentPostId)(id));
        dispatch((0, postsReducer_1.setBack)(back));
    };
    return (<Container onClick={tap} key={post.id}>
      <react_router_dom_1.Link to={`/p/${id}`} onClick={(e) => e.preventDefault()}>
        <img src={cover} alt={`cover ${id}`}/>
        <div className="text">
          {likecount > 0 && (<div className="like">
              <div className="icon"></div>
              <p>{likecount.toLocaleString()}</p>
            </div>)}
          {commentcount > 0 && (<div className="comment">
              <div className="icon"></div>
              <p>{commentcount.toLocaleString()}</p>
            </div>)}
        </div>
        {more && <Icons_1.MoreIconImages />}
        <div className="layer"></div>
      </react_router_dom_1.Link>
    </Container>);
};
const Container = styled_components_1.default.li `
  height: 100px;
  max-width: 300px;
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
  margin: -3px 0px;
  .moreimagesicon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 10;
    width: 1rem;
    height: 1rem;
  }
  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  &:hover {
    .layer {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .text {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text {
    z-index: 10;
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      p {
        font-weight: 600;
      }
    }
    .like {
      margin-right: 2rem;
      .icon {
        background-repeat: no-repeat;
        background-position: -340px -333px;
        height: 19px;
        width: 19px;
        background-image: url("/bg.png");
        margin-right: 6px;
      }
    }
    .comment {
      .icon {
        background-image: url("/bg.png");
        background-repeat: no-repeat;
        background-position: -382px -333px;
        height: 19px;
        margin-right: 6px;
        width: 19px;
      }
    }
  }
`;
exports.default = PostMini;
