import { useMemo } from "react";
import { getRoutesFromModules } from "../utils";

// Using import.meta.glob to get all route components
const entryPath = "/src/pages";
const pages = import.meta.glob("/src/pages/**/*.jsx");
export const pagesSelect = Object.entries(pages).map(([path]) => {
  const pagePath = path.replace(entryPath, "");
  return {
    label: pagePath,
    value: pagePath,
  };
});

/**
 * return routes about permission
 */
export function usePermissionRoutes() {
  return useMemo(() => {
    return getRoutesFromModules();
  }, []);
}
