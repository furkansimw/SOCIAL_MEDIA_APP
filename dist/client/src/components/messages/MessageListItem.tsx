import { FC, useEffect, useMemo, useState } from "react";
import { IMessage } from "../../interfaces/IMessages";
import PostMini from "../post/PostMini";
import { IPost } from "../../interfaces/ISlices";
import { Link } from "react-router-dom";
import { getPostW } from "../../api/messages";
import { styled } from "styled-components";
import { disableRightClick } from "../navigation/Navigation";
import { dateViewer } from "./base";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";

interface Props {
  msg: IMessage;
  classN: string;
  setPostData: any;
  dateView: boolean;
  seen: boolean;
}

const MessageListItem: FC<Props> = ({
  classN,
  msg,
  setPostData,
  dateView,
  seen,
}) => {
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const { type, content, reply, created, username } = msg;

  const box = useMemo(() => {
    if (type == 0) {
      return <p className="content">{content}</p>;
    } else if (type == 1) {
      return (
        <img
          className="img"
          onContextMenu={disableRightClick}
          src={content}
          alt="img"
        />
      );
    } else if (type == 2) {
      return (
        <Post src={content} postData={msg.postdata} setPostData={setPostData} />
      );
    }
  }, [type]);
  const mm = username == myusername ? "mm" : "";
  const date = useMemo(() => dateViewer(created), [created]);
  return (
    <>
      {dateView && <div className="date">{date}</div>}
      <Container className={`${classN} ${mm}`}>
        {reply && <span className="reply">{reply.slice(37)}</span>}
        {box}
      </Container>
      {seen && <p className="seen">Seen</p>}
    </>
  );
};

const Container = styled.li`
  margin: 2px 0px;
  display: flex;
  height: fit-content;
  width: 100%;

  &.single .content {
    border-radius: 18px;
  }
  &.first .content {
    border-radius: 18px 18px 18px 0px;
  }
  &.middle .content {
    border-radius: 0px 18px 18px 0px;
  }
  &.last .content {
    border-radius: 0px 18px 18px 18px;
  }
  &.mm {
    .content {
      background-color: #3797f0;
    }
    &.single .content {
      border-radius: 18px;
    }
    &.first .content {
      border-radius: 18px 18px 0px 18px;
    }
    &.middle .content {
      border-radius: 18px 0px 0px 18px;
    }
    &.last .content {
      border-radius: 18px 0px 18px 18px;
    }
  }
  .content {
    max-width: 50%;
    white-space: pre-wrap;
    word-wrap: break-word;
    width: fit-content;
    padding: 7px 12px;
    font-size: 15px;
    line-height: 20px;
    background-color: #262626;
  }
  &.mm {
    justify-content: end;
  }
  .text {
    display: none;
  }
  .layer {
    display: none;
  }
  .img {
    border-radius: 1rem;
    width: 250px;
    height: 250px;
  }
  .postmini {
    padding: 4px;
  }
  .private {
    font-size: 14px;
    font-weight: 400;
    padding: 8px;
    text-align: center;
    a {
      color: #3797f0;
      font-weight: 700;
    }
  }
  .postminix {
    display: block;
    position: relative;
    width: 270px;
    border-radius: 10px;
    margin: 4px 0px;
    padding: 4px;
    background-color: #262626;
    .up {
      padding: 8px;
      display: flex;
      align-items: center;
      .pp {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        margin-right: 10px;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .username {
        font-size: 14px;
        line-height: 1rem;
        font-weight: 600;
      }
    }
    .layer2 {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 55;
    }
    img {
      width: 100%;
      object-fit: cover;
      border-radius: 4px;
      height: 100%;
    }
  }
  .nf {
    margin: 2rem;
    display: block;
    font-weight: 600;
    color: #ed4956;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background-color: #262626;
  }
`;

const Post = ({
  src,
  postData,
  setPostData,
}: {
  src: string;
  postData: any;
  setPostData: any;
}) => {
  const [post, setPost] = useState<
    IPost | null | ["private", "anyaccountname"] | "loading"
  >("loading");

  useEffect(() => {
    if (postData) {
      setPost(postData);
    } else {
      getPostW(src).then((a: any) => {
        if (a?.msg == "private") {
          setPost(["private", a.account]);
          setPostData(["private", a.account]);
        } else {
          setPost(a);
          setPostData(a);
        }
      });
    }
  }, []);

  if (post == "loading") return <></>;

  if (post == null) return <span className="nf">Post not found</span>;

  return (
    <div className="postminix">
      {Array.isArray(post) ? (
        <div className="private">
          <span>
            You must follow <Link to={`/${post[1]}`}>{post[1]}</Link> the
            account to see the post.
          </span>
        </div>
      ) : (
        <div className="post-mini-wrapper">
          <div className="up">
            <Link className="pp" to={`/${post.pp}`}>
              <img
                onContextMenu={disableRightClick}
                src={post.pp || "/pp.jpg"}
                alt="pp"
              />
            </Link>
            <Link className="username" to={`/${post.username}`}>
              {post.username}
            </Link>
          </div>
          <Link className="post" to={`/p/${post.id}`}>
            <PostMini back="/" post={post} />
            <div className="layer2"></div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MessageListItem;
