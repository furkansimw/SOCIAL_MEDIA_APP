import React, { FC, useEffect, useMemo, useState } from "react";
import { IMessage } from "../../interfaces/IMessages";
import PostMini from "../post/PostMini";
import { IPost } from "../../interfaces/ISlices";
import { Link } from "react-router-dom";
import { getPostW } from "../../api/messages";
import { styled } from "styled-components";
import { disableRightClick } from "../navigation/Navigation";
import { dateViewer } from "./base";

interface Props {
  msg: IMessage;
  classN: string;
  setPostData: any;
  dateView: boolean;
}

const MessageListItem: FC<Props> = ({ classN, msg, setPostData, dateView }) => {
  const { type, content, reply, created } = msg;

  const box = useMemo(() => {
    if (type == 0) {
      return <p>{content}</p>;
    } else if (type == 1) {
      return <img onContextMenu={disableRightClick} src={content} alt="img" />;
    } else if (type == 2) {
      return (
        <Post src={content} postData={msg.postdata} setPostData={setPostData} />
      );
    }
  }, [type]);
  const date = useMemo(() => dateViewer(created), [created]);
  return (
    <>
      {dateView && <div className="date">{date}</div>}
      <Container className={classN}>
        {reply && <span className="reply">{reply.slice(37)}</span>}
        {box}
      </Container>
    </>
  );
};

const Container = styled.li`
  margin: 2px 0px;
  .text {
    display: none;
  }
  .layer {
    display: none;
  }
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
  .postmini {
    position: relative;
    .layer2 {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 55;
    }
    width: 250px;
    height: 250px;
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
      getPostW(src).then((a) => {
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

  if (post == null) return <span>Post not found</span>;

  return (
    <div className="postmini">
      {Array.isArray(post) ? (
        <div className="private">
          <span>You must follow the account to see the post.</span>
          <Link to={`/${post[1]}`}>{post[1]}</Link>
        </div>
      ) : (
        <div className="post-mini-wrapper">
          <div className="up">
            <Link to={`/${post.pp}`}>
              <img src={post.pp || "/pp.jpg"} alt="pp" />
            </Link>
            <Link to={`/${post.username}`}>
              <p>{post.username}</p>
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
