import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";

import {
  useFlattenedRoutes,
  usePermissionRoutes,
  useRouteToMenuFn,
} from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useThemeToken } from "@/theme/hooks";

import { NAV_HORIZONTAL_HEIGHT } from "./config";

const NavHorizontal = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();
  const menuRoutes = menuFilter(permissionRoutes);
  const menuList = routeToMenuFn(menuRoutes);

  // Mendapatkan daftar menu yang dipipihkan dari rute
  const flattenedRoutes = useFlattenedRoutes();

  /**
   * state
   */
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([""]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

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
  };

  const menuStyle = {
    background: colorBgElevated,
  };

  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        className="!z-10 !border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={menuStyle}
      />
    </div>
  );
};

export default NavHorizontal;
