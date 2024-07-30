import { lazy } from "react";

// management
export const UserPage = lazy(() => import(`@/pages/management/system/user`));
export const RolePage = lazy(() => import(`@/pages/management/role`));
export const DepartmentPage = lazy(
  () => import(`@/pages/management/department`)
);

// kanban
export const Kanban = lazy(() => import("@/pages/dashboard/analysis"));
