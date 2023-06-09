import styled from "styled-components";

const LoadingBox = () => {
  return (
    <Container className="loading-box">
      <LoadingIcon />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  @keyframes looprotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: 1.4s linear looprotate infinite;
    width: 2rem;
    height: 2rem;
    color: #fafafa;
    fill: #fafafa;
  }
`;

const LoadingIcon = () => (
  <svg
    aria-label="Loading..."
    className="loading-icon"
    role="img"
    viewBox="0 0 100 100"
  >
    <rect
      className="x1i210e2"
      height="6"
      opacity="0"
      rx="3"
      ry="3"
      transform="rotate(-90 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.08333333333333333"
      rx="3"
      ry="3"
      transform="rotate(-60 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.16666666666666666"
      rx="3"
      ry="3"
      transform="rotate(-30 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.25"
      rx="3"
      ry="3"
      transform="rotate(0 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.3333333333333333"
      rx="3"
      ry="3"
      transform="rotate(30 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.4166666666666667"
      rx="3"
      ry="3"
      transform="rotate(60 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.5"
      rx="3"
      ry="3"
      transform="rotate(90 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.5833333333333334"
      rx="3"
      ry="3"
      transform="rotate(120 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.6666666666666666"
      rx="3"
      ry="3"
      transform="rotate(150 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.75"
      rx="3"
      ry="3"
      transform="rotate(180 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.8333333333333334"
      rx="3"
      ry="3"
      transform="rotate(210 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
    <rect
      className="x1i210e2"
      height="6"
      opacity="0.9166666666666666"
      rx="3"
      ry="3"
      transform="rotate(240 50 50)"
      width="25"
      x="72"
      y="47"
    ></rect>
  </svg>
);

export default LoadingBox;
