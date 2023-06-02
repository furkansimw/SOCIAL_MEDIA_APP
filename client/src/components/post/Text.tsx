import React from "react";

const Text = () => {
  console.log(window.location.pathname);
  return (
    <div>
      <h1>Text</h1>
      <p>{window.location.pathname}</p>
      <button
        onClick={() => {
          window.history.pushState("data", "unused", "/xde");
        }}
      >
        Button
      </button>
      <button onClick={() => alert(window.location.pathname)}>Button</button>
    </div>
  );
};

export default Text;
