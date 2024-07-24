import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";

import PageError from "@/pages/sys/error/PageError";
import { useUserToken, useUserInfo } from "@/store/userStore";
import { flattenTrees } from "@/utils/tree";

const AuthGuard = ({ children, menuRoutes = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useUserToken();
  const userInfo = useUserInfo();
  const { privileges: userRole } = userInfo;
  const flattenRoutes = flattenTrees(menuRoutes);

  const checkAccess = useCallback(() => {
    if (!accessToken) {
      navigate("/login");
      return false;
    }

    const currentRoute = flattenRoutes.find((route) => {
      const fullPath = route?.meta?.key;
      return fullPath === location.pathname;
    });

    if (currentRoute && currentRoute.roles) {
      const hasAccess = currentRoute.roles.some((role) =>
        userRole.includes(role)
      );
      if (!hasAccess) {
        navigate("/403");
      }
    }

    // for (const route of menuRoutes) {
    //   if (route.children) {
    //     for (const child of route.children) {
    //       const fullPath = `/${route.path}/${child.path}`;
    //       if (
    //         location.pathname === fullPath &&
    //         child.roles &&
    //         !child.roles.includes(userRole)
    //       ) {
    //         navigate("/403");
    //         return false;
    //       }
    //     }
    //   }
    //   if (
    //     location.pathname === `/${route.path}` &&
    //     route.roles &&
    //     !route.roles.includes(userRole)
    //   ) {
    //     navigate("/403");
    //     return false;
    //   }
    // }

    return true;
  }, [
    accessToken,
    flattenRoutes,
    location.pathname,
    menuRoutes,
    navigate,
    userRole,
  ]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
};

export default AuthGuard;
