import { ascend } from "ramda";

/**
 * Mengembalikan rute menu
 */
export const menuFilter = (items) => {
  return items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Infinity));
};

/**
 * Berdasarkan struktur file di src/router/routes/modules untuk secara dinamis menghasilkan rute
 */
export function getRoutesFromModules() {
  const menuModules = [];

  const modules = import.meta.glob("./routes/modules/**/*.jsx", {
    eager: true,
  });
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    menuModules.push(...modList);
  });
  return menuModules;
}

/**
 * Mengembalikan rute yang akan digunakan di menu sidebar
 */
export function getMenuRoutes(appRouteObjects) {
  // return menuFilter(getMenuModules());
  return menuFilter(appRouteObjects);
}

/**
 * Mengembalikan rute yang dipipihkan
 */
export function flattenMenuRoutes(routes) {
  return routes.reduce((prev, item) => {
    const { meta, children } = item;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
}
