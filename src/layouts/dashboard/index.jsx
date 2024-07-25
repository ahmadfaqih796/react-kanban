import { useScroll } from "framer-motion";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { CircleLoading } from "@/components/loading";
import ProgressBar from "@/components/progress-bar";
import { useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import Header from "./header";
// import Main from "./main";
import Nav from "./nav";
import NavHorizontal from "./nav-horizontal";
import { ThemeLayout, ThemeMode } from "@/types/enum";

// import { ThemeLayout, ThemeMode } from '@/type/enum';

const DashboardLayout = () => {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  const { themeLayout, themeMode } = useSettings();

  const mainEl = useRef(null);
  const { scrollY } = useScroll({ container: mainEl });

  /**
   * Apakah sumbu y menggulung
   */
  const [offsetTop, setOffsetTop] = useState(false);
  const onOffSetTop = useCallback(() => {
    scrollY.on("change", (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
      <Nav />
    </div>
  );

  const nav =
    themeLayout === ThemeLayout.Horizontal ? <NavHorizontal /> : navVertical;

  return (
    <StyleWrapper $themeMode={themeMode}>
      <ProgressBar />
      <div
        className={`flex h-screen overflow-hidden ${
          themeLayout === ThemeLayout.Horizontal ? "flex-col" : ""
        }`}
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            "color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        <Suspense fallback={<CircleLoading />}>
          <Header
            offsetTop={
              themeLayout === ThemeLayout.Vertical ? offsetTop : undefined
            }
          />
          {nav}
          {/* <Main ref={mainEl} offsetTop={offsetTop} /> */}
        </Suspense>
      </div>
    </StyleWrapper>
  );
};

export default DashboardLayout;

const StyleWrapper = styled.div`
  /* Mengatur gaya keseluruhan scrollbar */
  ::-webkit-scrollbar {
    width: 8px; /* Mengatur lebar scrollbar */
  }

  /* Mengatur gaya track scrollbar */
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${(props) =>
      props.$themeMode === ThemeMode.Dark ? "#2c2c2c" : "#FAFAFA"};
  }

  /* Mengatur gaya thumb scrollbar */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) =>
      props.$themeMode === ThemeMode.Dark ? "#6b6b6b" : "#C1C1C1"};
  }

  /* Mengatur gaya saat mouse hover di scrollbar */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) =>
      props.$themeMode === ThemeMode.Dark ? "#939393" : "#7D7D7D"};
  }
`;
