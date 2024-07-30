import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { DepartmentPage, RolePage, UserPage } from "../pages";

const management = {
  order: 2,
  path: "management",
  roles: ["ADMIN"],
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: "sys.menu.management",
    icon: (
      <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />
    ),
    key: "/management",
  },
  children: [
    {
      index: true,
      roles: ["ADMIN", "USER"],
      element: <Navigate to="user" replace />,
    },
    {
      path: "role",
      element: <RolePage />,
      roles: ["ADMIN"],
      meta: {
        label: "sys.menu.system.role",
        key: "/management/role",
      },
    },
    {
      path: "user",
      element: <UserPage />,
      roles: ["ADMIN"],
      meta: { label: "sys.menu.system.user", key: "/management/user" },
    },
    {
      path: "department",
      element: <DepartmentPage />,
      roles: ["ADMIN"],
      meta: {
        label: "Department",
        key: "/management/department",
      },
    },
  ],
};

export default management;
