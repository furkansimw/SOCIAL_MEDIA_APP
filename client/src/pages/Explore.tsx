import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  selectHasMore,
  selectLoading,
  selectPostsExplore,
} from "../redux/postsSlice";
import { getPosts } from "../api/posts";
import LoadingBox from "../components/LoadingBox";
import PostMini from "../components/PostMini";
import styled from "styled-components";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPostsExplore);
  const { explore: loading } = useSelector(selectLoading);
  const { explore: hasmore } = useSelector(selectHasMore);

  useEffect(() => {
    if (posts.length == 0 && hasmore) dispatch(getPosts({ explore: true }));
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <PostMini post={post} />
      ))}
      {loading && <LoadingBox />}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  max-width: 1206px;
  margin: 0px 2rem;
  padding: 2rem 0px;
  display: grid;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .loading-box {
    margin: 2rem 0px;
  }
`;

export default Explore;
