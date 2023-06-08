import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { getPosts } from "../api/posts.ts";
import {
  selectMetaData,
  selectPostsHome,
  setOffset,
} from "../redux/postsReducer.ts";
import PostItemHome from "../components/post/PostItemHome.tsx";
import LoadingBox from "../components/LoadingBox.tsx";
import styled from "styled-components";
import { shallowEqual } from "react-redux";
import Title from "../components/Title.tsx";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPostsHome);
  const {
    hasmore: { home: hasmore },
    loading: { home: loading },
    offset: { home: offset },
  } = useSelector(selectMetaData, shallowEqual);

  useEffect(() => {
    if (posts.length == 0) dispatch(getPosts({}));
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if (loading || !hasmore) return;
    const { created: date, id } = posts[posts.length - 1];
    const { scrollTop, scrollHeight, clientHeight } = e.target as Element;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      dispatch(getPosts({ date, id }));
    }
  };

  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    listRef.current!.scroll({ top: offset });

    return () => {
      const offset = listRef.current!.scrollTop;
      dispatch(setOffset({ page: "home", offset }));
    };
  }, []);
  return (
    <Container ref={listRef} onScroll={onScroll}>
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
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  @media screen and (max-width: 600px) {
    li {
      min-height: 400px;
    }
  }
  .homelistitem {
    min-height: 650px;
    display: block;
    @media screen and (max-width: 620px) {
      min-height: calc(100% + 40px);
    }
  }
  li {
    max-width: 500px;
    width: 100%;
    min-width: 0px;
    &:first-child {
      border-top: none;
    }
  }
  .loading-box {
    margin: 2rem;
  }
`;

export default Posts;
