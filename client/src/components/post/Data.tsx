import { FC } from "react";
import styled from "styled-components";
import { IComment } from "../../interfaces/ISlices";

type DataProps = {
  loading: boolean;
  hasmore: boolean;
  data: IComment[];
};

const Data: FC<DataProps> = ({ data, hasmore, loading }) => (
  <DataContainer>
    <h1>Todo</h1>
  </DataContainer>
);

const DataContainer = styled.div`
  height: calc(100% - 130px - 4rem);
  overflow-y: auto;
`;

export default Data;
