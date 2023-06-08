import styled from "styled-components";
import { Bg } from "../../PostPopup";
import { IComment, ISubComment } from "../../../interfaces/ISlices";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../../redux/profileReducer";

const Report = ({
  close,
  process,
  data,
}: {
  close: () => void;
  process: () => void;
  data: IComment | ISubComment;
}) => {
  const { id } = useSelector(selectValues, shallowEqual);
  const active = data.owner == id;
  return (
    <>
      <Bg onClick={close} />
      <Container className="morep">
        <button onClick={close} className="b">
          Report
        </button>
        {active && (
          <button
            className="b"
            onClick={() => {
              process();
              close();
            }}
          >
            Remove
          </button>
        )}
        <button onClick={close}>Cancel</button>
      </Container>
    </>
  );
};

const Container = styled.div`
  border-radius: 12px;
  background-color: #262626;
  width: 400px;
  position: fixed;
  z-index: 120;
  top: calc(50% - 75px);
  left: calc(50% - 200px);
  @keyframes an {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: an 0.1s ease-in-out;
  button {
    display: block;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fafafa;
    width: 100%;
    border-top: 1px solid #363636;
    &:first-child {
      border-top: none;
    }
    &.b {
      font-weight: 600;
      color: #ed4956;
    }
  }
`;

export default Report;
