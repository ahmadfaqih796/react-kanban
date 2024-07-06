const importMetaEnv = import.meta.env;

const HOMEPAGE = importMetaEnv.VITE_APP_HOMEPAGE;
const APP_TITLE = importMetaEnv.VITE_GLOB_APP_TITLE;
const BASE_API = importMetaEnv.VITE_APP_BASE_API;
const ENV = importMetaEnv.VITE_APP_ENV || "development";

export { HOMEPAGE, APP_TITLE, BASE_API, ENV };
