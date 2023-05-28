import React, { useRef, useState } from "react";

const Test = () => {
  const [s, _s] = useState(0);
  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const el = e.target as HTMLUListElement;
    const { clientHeight, scrollTop, scrollHeight } = el;
    console.log({ clientHeight, scrollTop, scrollHeight });
  };

  return (
    <div>
      <h1>Test</h1>
      <ul
        onScroll={onScroll}
        style={{
          marginTop: "200px",
          height: "500px",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {Array.from({ length: 100 })
          .fill(1)
          .map((_, index) => index)
          .map((xd) => {
            return (
              <h1
                onClick={(e) => {
                  const childElement = e.target as Element;
                  const parentElement = childElement.parentElement!;
                  const parentRect = parentElement.getBoundingClientRect();
                  const childRect = childElement.getBoundingClientRect();
                  const childTopOffset = childRect.top - parentRect.top;
                  console.log(childTopOffset);
                }}
                className={"c" + xd.toString()}
              >
                {xd}
              </h1>
            );
          })}
      </ul>
    </div>
  );
};

export default Test;
