import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Text from "./Test";

function App() {
  const [count, setCount] = useState(0);

  const arttir = () => setCount(count + 1);

  return (
    <>
      <h1>Furkan {count}</h1>
      <button onClick={arttir}>Button</button>
      <Text state={count} />
    </>
  );
}

export default App;
