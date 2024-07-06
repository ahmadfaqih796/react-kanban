import { useState } from "react";
import { App as AntdApp } from "antd";
import { Helmet } from "react-helmet-async";

import MotionLazy from "./components/animate/motion-lazy";
import Router from "./router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AntdApp>
      <MotionLazy>
        <Helmet>
          <title>Slash Admin</title>
          <link
            rel="icon"
            //  href={Logo}
          />
        </Helmet>

        <Router />
      </MotionLazy>
    </AntdApp>
  );
}

export default App;
