import { useSettingActions, useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";
import { ThemeMode } from "@/types/enum";
import React from "react";

const Login = () => {
  const {
    colorPrimary,
    colorBgBase,
    colorTextSecondary,
    colorTextTertiary,
    colorBgContainer,
  } = useThemeToken();

  const settings = useSettings();
  const {
    themeMode,
    themeColorPresets,
    themeLayout,
    themeStretch,
    breadCrumb,
    multiTab,
  } = settings;
  const { setSettings } = useSettingActions();

  const setThemeMode = (themeMode) => {
    setSettings({
      ...settings,
      themeMode,
    });
  };

  const setThemeColorPresets = (themeColorPresets) => {
    setSettings({
      ...settings,
      themeColorPresets,
    });
  };

  const setThemeLayout = (themeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const setThemeStretch = (themeStretch) => {
    setSettings({
      ...settings,
      themeStretch,
    });
  };

  const setBreadCrumn = (checked) => {
    setSettings({
      ...settings,
      breadCrumb: checked,
    });
  };

  const setMultiTab = (checked) => {
    setSettings({
      ...settings,
      multiTab: checked,
    });
  };

  const style = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50, 50%",
  };

  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };

  const layoutBackground = (layout) =>
    themeLayout === layout
      ? `linear-gradient(135deg, ${colorBgBase} 0%, ${colorPrimary} 100%)`
      : "#919eab";

  return (
    <>
      <div
        className="mb-3 text-base font-semibold"
        style={{ color: colorTextSecondary }}
      >
        Mode
      </div>
      <div className="flex flex-row gap-4">
        <Card
          onClick={() => setThemeMode(ThemeMode.Light)}
          className="flex h-20 w-full cursor-pointer items-center justify-center"
        >
          <SvgIcon
            icon="ic-settings-mode-sun"
            size="24"
            color={themeMode === ThemeMode.Light ? colorPrimary : ""}
          />
        </Card>
        <Card
          onClick={() => setThemeMode(ThemeMode.Dark)}
          className="flex h-20 w-full cursor-pointer items-center justify-center"
        >
          <SvgIcon
            icon="ic-settings-mode-moon"
            size="24"
            color={themeMode === ThemeMode.Dark ? colorPrimary : ""}
          />
        </Card>
      </div>
    </>
  );
};

export default Login;
