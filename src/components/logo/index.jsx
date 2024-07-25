import { NavLink } from "react-router-dom";

import { useThemeToken } from "@/theme/hooks";

import { Iconify } from "../icon";

function Logo({ size = 50 }) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/">
      <Iconify icon="solar" color={colorPrimary} size={size} />
    </NavLink>
  );
}

export default Logo;
