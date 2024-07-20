import { Grid, theme } from "antd";

const { useBreakpoint } = Grid;

export function useResponsive() {
  const {
    token: { screenXS, screenSM, screenMD, screenLG, screenXL, screenXXL },
  } = theme.useToken();

  const screenArray = ["xs", "sm", "md", "lg", "xl", "xxl"];

  const screenEnum = {
    xs: screenXS,
    sm: screenSM,
    md: screenMD,
    lg: screenLG,
    xl: screenXL,
    xxl: screenXXL,
  };

  const screenMap = useBreakpoint();

  // Menggunakan [...screenArray].reverse().find() untuk menggantikan metode findLast, menghindari masalah kompatibilitas.
  // [...screenArray] membuat salinan dari screenArray, sehingga metode reverse tidak akan mengubah urutan asli array.
  const currentScreen = [...screenArray].reverse().find((item) => {
    const result = screenMap[item];
    return result === true;
  });

  return {
    screenEnum,
    screenMap,
    currentScreen,
  };
}
