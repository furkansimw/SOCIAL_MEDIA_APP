import { FC } from "react";
import styled from "styled-components";
import { IComment } from "../../interfaces/ISlices";
import LoadingBox from "../LoadingBox";

type DataProps = {
  loading: boolean;
  hasmore: boolean;
  data: IComment[];
};

const Data: FC<DataProps> = ({ data, hasmore, loading }) => {
  return (
    <DataContainer>
      <Content />
      {data.map((comment) => (
        <CommentItem comment={comment} />
      ))}
      {loading && <LoadingBox />}
    </DataContainer>
  );
};

const DataContainer = styled.ul`
  height: calc(100% - 130px - 4rem);
  overflow-y: auto;
  .loading-box {
    margin: 1rem 0px;
  }
  padding: 1rem;
`;

const Content = () => (
  <div>
    <h1>Content</h1>
  </div>
);

const CommentItem = ({ comment }: { comment: IComment }) => (
  <div>
    <h1>Commentitem</h1>
  </div>
);

export default Data;
