import { create } from "zustand";

import { getItem, removeItem, setItem } from "@/utils/storage";

import {
  StorageEnum,
  ThemeColorPresets,
  ThemeLayout,
  ThemeMode,
} from "@/types/enum";

const useSettingStore = create((set) => ({
  settings: getItem(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeMode: ThemeMode.Light,
    themeLayout: ThemeLayout.Vertical,
    themeStretch: false,
    breadCrumb: true,
    multiTab: true,
  },
  actions: {
    setSettings: (settings) => {
      set({ settings });
      setItem(StorageEnum.Settings, settings);
    },
    clearSettings() {
      removeItem(StorageEnum.Settings);
    },
  },
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () =>
  useSettingStore((state) => state.actions);
