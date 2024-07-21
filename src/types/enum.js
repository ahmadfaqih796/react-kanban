export const BasicStatus = {
  DISABLE: 0,
  ENABLE: 1,
};

export const ResultEnum = {
  SUCCESS: 0,
  ERROR: -1,
  TIMEOUT: 401,
};

export const StatusCodeEnum = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export const StorageEnum = {
  User: "user",
  Token: "token",
  Settings: "settings",
  I18N: "i18nextLng",
};

export const ThemeMode = {
  Light: "light",
  Dark: "dark",
};

export const ThemeLayout = {
  Vertical: "vertical",
  Horizontal: "horizontal",
  Mini: "mini",
};

export const ThemeColorPresets = {
  Default: "default",
  Cyan: "cyan",
  Purple: "purple",
  Blue: "blue",
  Orange: "orange",
  Red: "red",
};

export const LocalEnum = {
  en_US: "en_US",
  id_ID: "id_ID",
};

export const MultiTabOperation = {
  FULLSCREEN: "fullscreen",
  REFRESH: "refresh",
  CLOSE: "close",
  CLOSEOTHERS: "closeOthers",
  CLOSEALL: "closeAll",
  CLOSELEFT: "closeLeft",
  CLOSERIGHT: "closeRight",
};

export const PermissionType = {
  CATALOGUE: 0,
  MENU: 1,
  BUTTON: 2,
};
