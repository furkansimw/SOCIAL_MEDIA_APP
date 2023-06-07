import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectCurrentPost } from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getPost } from "../api/posts";

const PostPage = () => {
  const postid = window.location.pathname.split("/")[2];
  const dispatch = useDispatch<AppDispatch>();
  const currentPost = useSelector(selectCurrentPost, shallowEqual);

  useEffect(() => {
    dispatch(getPost(postid));
  }, [postid]);

  return (
    <div>
      <h1>Furkan</h1>
    </div>
  );
};

export default PostPage;
