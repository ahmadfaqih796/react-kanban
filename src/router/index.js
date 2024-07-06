import { lazy } from "react";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";

import AuthGuard from "@/router/components/auth-guard";
import { ErrorRoutes } from "@/router/routes/error-routes";
import DashboardLayout from "@/layouts/dashboard";
import { usePermissionRoutes } from "./hooks/use-permission-routes";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute = {
  path: "/login",
  Component: lazy(() => import("@/pages/sys/login/Login")),
};
const PAGE_NOT_FOUND_ROUTE = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  // const permissionRoutes = usePermissionRoutes();
  const asyncRoutes = {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      // ...permissionRoutes,
    ],
  };

  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
}
