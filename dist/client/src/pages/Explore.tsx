import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  selectMetaData,
  selectPostsExplore,
  setOffset,
} from "../redux/postsReducer";
import { getPosts } from "../api/posts";
import LoadingBox from "../components/LoadingBox";
import PostMini from "../components/post/PostMini";
import styled from "styled-components";
import Title from "../components/Title";

const Explore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPostsExplore, shallowEqual);

  const {
    hasmore: { explore: hasmore },
    loading: { explore: loading },
    offset: { explore: offset },
  } = useSelector(selectMetaData, shallowEqual);

  useEffect(() => {
    if (posts.length == 0) dispatch(getPosts({ explore: true }));
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if (loading || !hasmore) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target as Element;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      const { created: date, id } = posts[posts.length - 1];
      dispatch(getPosts({ explore: true, date, id }));
    }
  };

  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    listRef.current!.scroll({ top: offset });

    return () => {
      const offset = listRef.current!.scrollTop;
      dispatch(setOffset({ page: "explore", offset }));
    };
  }, []);

  return (
    <Container ref={listRef} onScroll={onScroll}>
      <Title title="Explore" />
      <div className="content">
        {posts.map((post) => (
          <PostMini key={post.id} post={post} back="explore" />
        ))}
      </div>
      {loading && <LoadingBox />}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    max-width: calc(906px + 2rem);
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .loading-box {
    margin: 2rem 0px;
  }
`;

export default memo(Explore);
