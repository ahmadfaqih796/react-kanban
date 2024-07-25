import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

const HomePage = lazy(() => import(`@/pages/dashboard/workbench`));
const Analysis = lazy(() => import("@/pages/dashboard/analysis"));

const management = {
  order: 2,
  path: "management",
  roles: ["ADMIN", "USER"],
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.management",
    icon: (
      <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />
    ),
    key: "/management",
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
      meta: { label: "sys.menu.workbench", key: "/management/workbench" },
    },
    {
      path: "analysis",
      element: <Analysis />,
      roles: ["ADMIN"],
      meta: { label: "sys.menu.analysis", key: "/management/analysis" },
    },
  ],
};

export default management;
