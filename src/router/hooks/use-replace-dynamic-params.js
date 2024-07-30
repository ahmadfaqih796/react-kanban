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
