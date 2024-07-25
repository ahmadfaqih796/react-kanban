import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Iconify, SvgIcon } from "@/components/icon";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "@/types/enum";
import { useUserInfo } from "@/store/userStore";

/**
 * routes -> menus
 */
export const useRouteToMenuFn = () => {
  const { t } = useTranslation();
  const { themeLayout } = useSettings();
  const userInfo = useUserInfo();
  const { privileges: userRoles } = userInfo;
  console.log("frrrrrrrrr", userRoles);

  const routeToMenuFn = useCallback(
    (items) => {
      return items
        .filter((item) => {
          // Filter item berdasarkan role
          if (item.roles && item.roles.length > 0) {
            return item.roles.some((role) => userRoles.includes(role));
          }
          return true;
        })
        .filter((item) => !item.meta?.hideMenu)
        .map((item) => {
          const menuItem = {};
          const { meta, children, roles } = item;
          console.log("ppppppppppp", roles);

          if (meta) {
            const { key, label, icon, disabled, suffix } = meta;
            menuItem.key = key;
            menuItem.disabled = disabled;
            menuItem.label = (
              <div
                className={`inline-flex w-full items-center ${
                  themeLayout === ThemeLayout.Horizontal
                    ? "justify-start"
                    : "justify-between"
                } `}
              >
                <div>{t(label)}</div>
                {suffix}
              </div>
            );
            if (icon) {
              if (typeof icon === "string") {
                if (icon.startsWith("ic")) {
                  menuItem.icon = (
                    <SvgIcon
                      icon={icon}
                      size={24}
                      className="ant-menu-item-icon"
                    />
                  );
                } else {
                  menuItem.icon = (
                    <Iconify
                      icon={icon}
                      size={24}
                      className="ant-menu-item-icon"
                    />
                  );
                }
              } else {
                menuItem.icon = icon;
              }
            }
          }

          if (children) {
            menuItem.children = routeToMenuFn(children);
          }

          return menuItem;
        });
    },
    [t, themeLayout]
  );

  return routeToMenuFn;
};
