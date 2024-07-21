import { useThemeToken } from "@/theme/hooks";
import React from "react";

// import HeaderSimple from '../_common/header-simple';

export default function SimpleLayout({ children }) {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  return (
    <div
      className="flex h-screen w-full flex-col"
      style={{
        color: colorTextBase,
        background: colorBgElevated,
      }}
    >
      {/* <HeaderSimple /> */}
      {children}
    </div>
  );
}
