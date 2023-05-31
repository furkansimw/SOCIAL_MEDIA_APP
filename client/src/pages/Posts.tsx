import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { getPosts } from "../api/posts.ts";
import {
  selectHasMore,
  selectLoading,
  selectPostsHome,
} from "../redux/postsReducer.ts";
import PostItemHome from "../components/post/PostItemHome.tsx";
import LoadingBox from "../components/LoadingBox.tsx";
import styled from "styled-components";
import { shallowEqual } from "react-redux";
import Title from "../components/Title.tsx";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPostsHome);
  const { home: loading } = useSelector(selectLoading, shallowEqual);
  const { home: hasmore } = useSelector(selectHasMore, shallowEqual);

  useEffect(() => {
    if (posts.length == 0 && hasmore) dispatch(getPosts({}));
  }, []);

  return (
    <Container>
      <Title title="Posts" />
      {posts.map((post) => (
        <PostItemHome post={post} />
      ))}
      {loading && <LoadingBox />}
    </Container>
  );
};
const Container = styled.ul`
  height: 100vh;
  overflow-x: hidden;
  width: 100%;
  overflow-y: auto;
  max-width: 450px;
  margin: 2rem;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: start;
  padding: 2rem 0px;
  .loading-box {
    margin: 2rem;
  }
`;

export default Posts;
