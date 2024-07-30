import { lazy } from "react";

// dashboard
export const HomePage = lazy(() => import(`@/pages/dashboard/workbench`));
export const Analysis = lazy(() => import("@/pages/dashboard/analysis"));

// management
export const UserPage = lazy(() => import(`@/pages/management/system/user`));
export const RolePage = lazy(() => import(`@/pages/management/role`));
export const DepartmentPage = lazy(
  () => import(`@/pages/management/department`)
);

// kanban
export const Kanban = lazy(() => import("@/pages/dashboard/analysis"));
