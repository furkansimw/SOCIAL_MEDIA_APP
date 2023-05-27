import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  selectHasMore,
  selectLoading,
  selectPostsExplore,
} from "../redux/postsReducer";
import { getPosts } from "../api/posts";
import LoadingBox from "../components/LoadingBox";
import PostMini from "../components/post/PostMini";
import styled from "styled-components";
import LinkConverter from "../components/post/LinkConverter";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPostsExplore);
  const { explore: loading } = useSelector(selectLoading, shallowEqual);
  const { explore: hasmore } = useSelector(selectHasMore, shallowEqual);

  useEffect(() => {
    if (posts.length == 0 && hasmore) dispatch(getPosts({ explore: true }));
  }, []);

  return (
    <Container>
      <div className="content">
        {posts.map((post) => (
          <PostMini key={post.id} post={post} />
        ))}
      </div>
      {loading && <LoadingBox />}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    max-width: calc(906px + 4rem);
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .loading-box {
    margin: 2rem 0px;
  }
`;

export default Explore;
