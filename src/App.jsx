import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import { HOMEPAGE } from "vite-env";
import Test from "./pages/Test";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Test />
      <button type="primary">Login</button>
    </>
  );
}

export default App;
