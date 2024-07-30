import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { CircleLoading } from "@/components/loading";

import SimpleLayout from "@/layouts/simple";
import AuthGuard from "../components/auth-guard";
import { Page403, Page404, Page500 } from "./pages";

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes = {
  element: (
    <AuthGuard>
      <SimpleLayout>
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    </AuthGuard>
  ),
  children: [
    { path: "403", element: <Page403 /> },
    { path: "404", element: <Page404 /> },
    { path: "500", element: <Page500 /> },
  ],
};
