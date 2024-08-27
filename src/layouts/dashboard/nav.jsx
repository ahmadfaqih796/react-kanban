import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Color from "color";
import { m } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";

import MotionContainer from "@/components/animate/motion-container";
import { varSlide } from "@/components/animate/variants";
import Logo from "@/components/logo";
import Scrollbar from "@/components/scrollbar";
import {
  useFlattenedRoutes,
  usePermissionRoutes,
  useRouteToMenuFn,
} from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import { ThemeLayout } from "@/types/enum";
import { Menu } from "antd";
import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from "./config";

const slideInLeft = varSlide({ distance: 10 }).inLeft;

const Nav = (props) => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorPrimary, colorTextBase, colorBgElevated, colorBorder } =
    useThemeToken();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const menuStyle = {
    background: colorBgElevated,
  };

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();

  // const filterMenuRoutesByRole = (routes) => {
  //   return routes.reduce((filteredRoutes, route) => {
  //     const { roles, children, ...rest } = route;
  //     if (!roles || roles.some((role) => userRoles.includes(role))) {
  //       const filteredChildren = children
  //         ? filterMenuRoutesByRole(children)
  //         : [];
  //       filteredRoutes.push({ ...rest, children: filteredChildren });
  //     }
  //     return filteredRoutes;
  //   }, []);
  // };

  // const menuRoutes = menuFilter(permissionRoutes);
  const menuRoutes = menuFilter(permissionRoutes);
  const menuList = routeToMenuFn(menuRoutes);

  // const menuRoutes = filterMenuRoutesByRole(permissionRoutes);
  // const menuList = routeToMenuFn(menuRoutes);

  // Mendapatkan daftar menu yang dipipihkan dari rute
  const flattenedRoutes = useFlattenedRoutes();

  /**
   * state
   */
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [menuMode, setMenuMode] = useState("inline");

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      const openKeys = matches
        .filter((match) => match.pathname !== "/")
        .map((match) => match.pathname);
      setOpenKeys(openKeys);
    }
  }, [matches, themeLayout]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);
      setMenuMode("inline");
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
      setMenuMode("inline");
    }
  }, [themeLayout]);

  /**
   * events
   */
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  const onClick = ({ key }) => {
    // Dari informasi rute yang dipipihkan, cocokkan yang diklik saat ini
    const nextLink = flattenedRoutes?.find((el) => el.key === key);

    // Menangani situasi khusus pada item menu yang merupakan tautan eksternal
    // Ketika mengklik tautan eksternal, tidak mengarahkan rute, tidak menambahkan tab di proyek saat ini, tidak memilih rute saat ini, membuka tautan eksternal di tab baru
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, "_blank");
      return;
    }

    navigate(key);
    props?.closeSideBarDrawer?.();
  };

  const setThemeLayout = (themeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapsed = () => {
    if (!collapsed) {
      setThemeLayout(ThemeLayout.Mini);
    } else {
      setThemeLayout(ThemeLayout.Vertical);
    }
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        <MotionContainer className="flex items-center">
          <Logo />
          {themeLayout !== ThemeLayout.Mini && (
            <m.div variants={slideInLeft}>
              <span
                className="ml-2 text-xl font-bold"
                style={{ color: colorPrimary }}
              >
                Smart FLOW
              </span>
            </m.div>
          )}
        </MotionContainer>
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
          style={{
            color: colorTextBase,
            borderColor: colorTextBase,
            fontSize: 16,
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined size={20} />
          ) : (
            <MenuFoldOutlined size={20} />
          )}
        </button>
      </div>

      <Scrollbar
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        {/* <!-- Menu Sidebar --> */}
        <Menu
          mode={menuMode}
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
          style={menuStyle}
          inlineCollapsed={collapsed}
        />
      </Scrollbar>
    </div>
  );
};

export default Nav;
