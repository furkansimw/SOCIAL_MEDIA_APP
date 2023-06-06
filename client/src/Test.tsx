import { useEffect } from "react";
import socket from "./api/socket/socket";

const Test = () => {
  useEffect(() => {
    socket.on("notifications", (data) => alert("xd"));
  }, []);
  const tap = () => socket.emit("notifications", "xd");
  return (
    <div>
      <h1>Test</h1>
      <button onClick={tap}>Button</button>
    </div>
  );
};

export default Test;
