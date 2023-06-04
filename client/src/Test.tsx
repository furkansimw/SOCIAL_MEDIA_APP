import { useEffect } from "react";
import socket from "./api/socket/socket";

const Test = () => {
  const click = () => socket.emit("hello", "world");

  useEffect(() => {
    socket.on("hello", (data) => alert(data));
    return () => {};
  }, []);

  return (
    <div>
      <h1>Furkan</h1>
      <button style={{ color: "red" }} onClick={click}>
        Alert
      </button>
    </div>
  );
};

export default Test;
