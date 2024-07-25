import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";

import { usePathname } from "@/router/hooks";
import { useThemeToken } from "@/theme/hooks";

const ProgressBar = () => {
  const pathname = usePathname();
  const { colorPrimary } = useThemeToken();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.configure({
        showSpinner: false,
      });
      NProgress.start();
      changeNprogressBar();
      setVisible(true);
    }

    if (visible) {
      NProgress.done();
      setVisible(false);
    }

    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, mounted, visible]);

  const changeNprogressBar = () => {
    const nprogress = document.getElementById("nprogress");
    if (nprogress) {
      const bar = nprogress.querySelector(".bar");
      const peg = nprogress.querySelector(".peg");

      if (bar) {
        bar.style.background = colorPrimary;
        bar.style.boxShadow = `0 0 2px ${colorPrimary}`;
      }

      if (peg) {
        peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`;
      }
    }
  };

  return null;
};

export default ProgressBar;
