import { App as AntdApp } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import MotionLazy from "./components/animate/motion-lazy";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AntdApp>
      <MotionLazy>
        <Helmet>
          <title>Faqih Admin</title>
          <link
            rel="icon"
            //  href={Logo}
          />
        </Helmet>
        {/* <Router /> */}
      </MotionLazy>
    </AntdApp>
  );
}

export default App;
