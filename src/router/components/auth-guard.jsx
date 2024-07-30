import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";

import PageError from "@/pages/sys/error/PageError";
import { useUserToken, useUserInfo } from "@/store/userStore";
import { flattenTrees } from "@/utils/tree";
import PropTypes from "prop-types";

const AuthGuard = ({ children, menuRoutes }) => {
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

    return true;
  }, [accessToken, flattenRoutes, location.pathname, navigate, userRole]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  menuRoutes: PropTypes.array,
};

export default AuthGuard;
