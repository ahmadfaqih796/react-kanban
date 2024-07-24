import { isEmpty } from "ramda";
import { Suspense, lazy, useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import ProTag from "@/theme/antd/components/tag";

import { BasicStatus, PermissionType } from "@/types/enum";
import { getRoutesFromModules } from "../utils";

// Using import.meta.glob to get all route components
const entryPath = "/src/pages";
const pages = import.meta.glob("/src/pages/**/*.jsx");
export const pagesSelect = Object.entries(pages).map(([path]) => {
  const pagePath = path.replace(entryPath, "");
  return {
    label: pagePath,
    value: pagePath,
  };
});

// Function to resolve absolute path
function resolveComponent(path) {
  return pages[`${entryPath}${path}`];
}

/**
 * return routes about permission
 */
export function usePermissionRoutes() {
  const routers = getRoutesFromModules();
  // console.log("vvvvvvvvvvv", routers);
  // const flattenRoutes = flattenTrees(routers);
  // const permissionRoutes = transformPermissionToMenuRoutes(
  //   routers || [],
  //   flattenRoutes
  // );
  // console.log("pohon", flattenRoutes);

  // return useMemo(() => {
  //   const flattenRoutes = flattenTrees(routers);
  //   const permissionRoutes = transformPermissionToMenuRoutes(
  //     routers || [],
  //     flattenRoutes
  //   );
  //   return [...permissionRoutes];
  // }, [routers]);
  return useMemo(() => {
    return routers;
  }, []);
  // const userInfo = useUserInfo();
  // const { privileges: userRole } = userInfo;
  // console.log("ccscscscs", userRole);
  // const filteredRoutes = filterRoutesByRoles(routers, userRole);

  // return useMemo(() => {
  //   return filteredRoutes;
  // }, [filteredRoutes]);

  // const permissions = useUserPermission();

  // return useMemo(() => {
  //   const flattenedPermissions = flattenTrees(permissions);
  //   const permissionRoutes = transformPermissionToMenuRoutes(
  //     permissions || [],
  //     flattenedPermissions
  //   );
  //   return [...permissionRoutes];
  // }, [permissions]);
}

const filterRoutesByRoles = (routes, userRoles) => {
  return routes.filter((route) => {
    if (route.children) {
      route.children = filterRoutesByRoles(route.children, userRoles);
    }
    if (route.roles) {
      console.log(route.roles.some((role) => userRoles.includes(role)));
      return route.roles.some((role) => userRoles.includes(role));
    }
    return true;
  });
};

function transformPermissionToMenuRoutes(permissions, flattenedPermissions) {
  return permissions.map((permission) => {
    const {
      route,
      type,
      label,
      icon,
      order,
      hide,
      hideTab,
      status,
      frameSrc,
      newFeature,
      component,
      parentId,
      children = [],
    } = permission;

    const appRoute = {
      path: route,
      meta: {
        label,
        key: getCompleteRoute(permission, flattenedPermissions),
        hideMenu: !!hide,
        hideTab,
        disabled: status === BasicStatus.DISABLE,
      },
    };

    if (order) appRoute.order = order;
    if (icon) appRoute.meta.icon = icon;
    if (frameSrc) appRoute.meta.frameSrc = frameSrc;

    if (newFeature) {
      appRoute.meta.suffix = (
        <ProTag
          color="cyan"
          icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}
        >
          NEW
        </ProTag>
      );
    }

    if (type === PermissionType.CATALOGUE) {
      appRoute.meta.hideTab = true;
      if (!parentId) {
        appRoute.element = (
          <Suspense fallback={<CircleLoading />}>
            <Outlet />
          </Suspense>
        );
      }
      appRoute.children = transformPermissionToMenuRoutes(
        children,
        flattenedPermissions
      );

      if (!isEmpty(children)) {
        appRoute.children.unshift({
          index: true,
          element: <Navigate to={children[0].route} replace />,
        });
      }
    } else if (type === PermissionType.MENU) {
      const Element = lazy(resolveComponent(component));
      if (frameSrc) {
        appRoute.element = <Element src={frameSrc} />;
      } else {
        appRoute.element = (
          <Suspense fallback={<CircleLoading />}>
            <Element />
          </Suspense>
        );
      }
    }

    return appRoute;
  });
}

function getCompleteRoute(permission, flattenedPermissions, route = "") {
  const currentRoute = route
    ? `/${permission.route}${route}`
    : `/${permission.route}`;

  if (permission.parentId) {
    const parentPermission = flattenedPermissions.find(
      (p) => p.id === permission.parentId
    );
    return getCompleteRoute(
      parentPermission,
      flattenedPermissions,
      currentRoute
    );
  }

  return currentRoute;
}
