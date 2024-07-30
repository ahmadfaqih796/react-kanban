import { App as AntdApp } from "antd";
import { Helmet } from "react-helmet-async";

import MotionLazy from "./components/animate/motion-lazy";
import Router from "./router";
import AntdConfig from "./theme/antd";

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>Smart FLOW</title>
            <link
              rel="icon"
              //  href={Logo}
            />
          </Helmet>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
