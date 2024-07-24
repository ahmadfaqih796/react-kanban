import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

const HomePage = lazy(() => import(`@/pages/dashboard/workbench`));
const Analysis = lazy(() => import("@/pages/dashboard/analysis"));

const dashboard = {
  order: 1,
  path: "dashboard",
  roles: ["ADMIN", "USER"],
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.dashboard",
    icon: (
      <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />
    ),
    key: "/dashboard",
  },
  children: [
    {
      index: true,
      roles: ["ADMIN", "USER"],
      element: <Navigate to="workbench" replace />,
    },
    {
      path: "workbench",
      element: <HomePage />,
      roles: ["ADMIN", "USER"],
      meta: { label: "sys.menu.workbench", key: "/dashboard/workbench" },
    },
    {
      path: "analysis",
      element: <Analysis />,
      roles: ["ADMIN"],
      meta: { label: "sys.menu.analysis", key: "/dashboard/analysis" },
    },
  ],
};

export default dashboard;
