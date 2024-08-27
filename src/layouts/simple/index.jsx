import { useThemeToken } from "@/theme/hooks";
import PropTypes from "prop-types";

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

SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
