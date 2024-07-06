import { lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createHashRouter,
  createBrowserRouter,
} from "react-router-dom";

import { ErrorRoutes } from "@/router/routes/error-routes";
import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "./components/auth-guard";
import { APP_BROWSER_HASH, HOMEPAGE } from "vite-env";
// import { usePermissionRoutes } from "./hooks/use-permission-routes";

const LoginRoute = {
  path: "/login",
  Component: lazy(() => import("@/pages/sys/login/Login")),
};
const PAGE_NOT_FOUND_ROUTE = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  console.log("ssssssssssssss", APP_BROWSER_HASH);
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

  const router =
    APP_BROWSER_HASH === "true"
      ? createHashRouter(routes)
      : createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
