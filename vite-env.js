const importMetaEnv = import.meta.env;

const HOMEPAGE = importMetaEnv.VITE_APP_HOMEPAGE;
const APP_TITLE = importMetaEnv.VITE_GLOB_APP_TITLE;
const APP_BROWSER_HASH = importMetaEnv.VITE_GLOB_APP_BROWSER_HASH;
const BASE_API = importMetaEnv.VITE_APP_BASE_API;
const ENV = importMetaEnv.VITE_APP_ENV || "development";

export { HOMEPAGE, APP_TITLE, APP_BROWSER_HASH, BASE_API, ENV };
