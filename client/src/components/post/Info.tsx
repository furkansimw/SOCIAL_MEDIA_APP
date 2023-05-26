import { Link } from "react-router-dom";
import { DetailIcon } from "../Icons";
import styled from "styled-components";
import { disableRightClick } from "../Navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectCurrentPost, setBack } from "../../redux/postsReducer";
import { AppDispatch, RootState } from "../../redux/store";

const Info = () => {
  const postid = window.location.pathname.split("/")[2];
  const dispatch = useDispatch<AppDispatch>();

  const close = () => dispatch(setBack(null));
  const { username, isfollowing, pp } = useSelector(
    (s: RootState) => selectCurrentPost(s, postid),
    shallowEqual
  )!;

  const to = `/${username}`;

  return (
    <InfoContainer>
      <div className="l">
        <Link className="pp" to={to} replace onClick={close}>
          <img
            onContextMenu={disableRightClick}
            src={pp || "/pp.jpg"}
            alt="pp"
          />
        </Link>
        <Link className="username" to={to} replace onClick={close}>
          <p>{username}</p>
        </Link>
        <span>•</span>
        {!isfollowing && <button>Follow</button>}
      </div>
      <button className="d">
        <DetailIcon />
      </button>
    </InfoContainer>
  );
};
const InfoContainer = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 1rem;
  border-bottom: 1px solid #262626;
  .l {
    display: flex;
    align-items: center;
    .pp {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
      }
      margin-right: 14px;
    }
    .username {
      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
      }
    }
    span {
      margin: 0px 6px;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 600;
      color: #0095f6;
      &:hover {
        color: #fafafa;
      }
    }
  }
  .d {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  a:hover {
    opacity: 0.6;
  }
  .d:hover {
    opacity: 0.6;
  }
`;

export default Info;
