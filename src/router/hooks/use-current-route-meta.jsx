import { isEmpty } from "ramda";
import { useEffect, useState } from "react";
import { useMatches, useOutlet } from "react-router-dom";

import { useFlattenedRoutes } from "./use-flattened-routes";
import { useRouter } from "./use-router";

const HOMEPAGE = import.meta.env.VITE_APP_HOMEPAGE;
/**
 * Mengembalikan informasi Meta dari rute saat ini
 */
export function useCurrentRouteMeta() {
  const { push } = useRouter();

  // Mendapatkan instance komponen rute
  const children = useOutlet();

  // Mendapatkan semua rute yang cocok
  const matches = useMatches();

  // Mendapatkan menu rute yang sudah dipipihkan
  const flattenedRoutes = useFlattenedRoutes();

  const [currentRouteMeta, setCurrentRouteMeta] = useState();

  useEffect(() => {
    // Mendapatkan rute yang cocok saat ini
    const lastRoute = matches.at(-1);
    if (!lastRoute) return;

    const { pathname, params } = lastRoute;
    const matchedRouteMeta = flattenedRoutes.find((item) => {
      const replacedKey = replaceDynamicParams(item.key, params);
      return replacedKey === pathname || `${replacedKey}/` === pathname;
    });

    if (matchedRouteMeta) {
      matchedRouteMeta.outlet = children;
      if (!isEmpty(params)) {
        matchedRouteMeta.params = params;
      }
      setCurrentRouteMeta({ ...matchedRouteMeta });
    } else {
      push(HOMEPAGE);
    }
  }, [matches]);

  return currentRouteMeta;
}

/**
 * Mengganti `user/:id` dengan `/user/1234512345`
 */
export const replaceDynamicParams = (menuKey, params) => {
  let replacedPathName = menuKey;

  // Memeriksa nama parameter dalam path rute
  const paramNames = menuKey.match(/:\w+/g);

  if (paramNames) {
    paramNames.forEach((paramName) => {
      // Menghapus tanda titik dua, mendapatkan nama parameter
      const paramKey = paramName.slice(1);
      // Memeriksa apakah objek params memiliki parameter ini
      if (params[paramKey]) {
        // Mengganti nilai dalam path dengan nilai dari params
        replacedPathName = replacedPathName.replace(
          paramName,
          params[paramKey]
        );
      }
    });
  }

  return replacedPathName;
};
