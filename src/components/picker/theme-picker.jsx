import { useSettingActions, useSettings } from "@/store/settingStore";
import { ThemeMode } from "@/types/enum";
import { Button } from "antd";
import { useState } from "react";
import { IconButton, SvgIcon } from "../icon";

const ThemePicker = () => {
  const settings = useSettings();
  const { themeMode } = settings;
  const { setSettings } = useSettingActions();

  // Function to toggle theme mode
  const toggleThemeMode = () => {
    const newThemeMode =
      themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    setSettings({
      ...settings,
      themeMode: newThemeMode,
    });
  };

  return (
    <IconButton onClick={toggleThemeMode}>
      {/* {themeMode === ThemeMode.Dark ? "Dark" : "Light"} */}
      <SvgIcon
        icon={
          themeMode === ThemeMode.Dark
            ? "ic-settings-mode-moon"
            : "ic-settings-mode-sun"
        }
        size="24"
        color={themeMode === ThemeMode.Dark ? "#fff" : ""}
      />
    </IconButton>
  );
};

export default ThemePicker;
