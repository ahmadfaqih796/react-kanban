import axios from "axios";

import { t } from "@/locales/i18n";
import useAlertStore from "@/store/alertStore";
import userStore from "@/store/userStore";

import { StatusCodeEnum, StorageEnum } from "@/types/enum";
import { clearItems, getItem, removeItem } from "@/utils/storage";

// Membuat instance axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// Interceptor untuk permintaan
axiosInstance.interceptors.request.use(
  (config) => {
    // Sebelum mengirimkan permintaan, lakukan hal ini
    const token = getItem(StorageEnum.Token)?.accessToken;
    config.headers.Authorization = `Bearer ${token || ""}`;
    return config;
  },
  (error) => {
    // Ketika terjadi kesalahan pada permintaan
    return Promise.reject(error);
  }
);

// Interceptor untuk tanggapan
axiosInstance.interceptors.response.use(
  (res) => {
    if (!res.data) throw new Error(t("sys.api.apiRequestFailed"));

    const alertStore = useAlertStore.getState();
    const { status, data, message } = res.data;

    if (status === "401") {
      userStore.getState().actions.clearUserInfoAndToken();
      removeItem("token");
      return;
    }

    // Jika permintaan bisnis berhasil
    const hasSuccess =
      data && Reflect.has(res.data, "status") && status === StatusCodeEnum.OK;
    if (hasSuccess) {
      alertStore.setAlert("success", message);
      return res.data;
    }

    alertStore.setAlert("error", message);
    // Jika terjadi kesalahan pada permintaan bisnis
    throw new Error(message || t("sys.api.apiRequestFailed"));
  },
  (error) => {
    const { response, message } = error || {};
    const errMsg =
      response?.data?.message || message || t("sys.api.errorMessage");

    console.log("eeeeeeeeeeeeeeee", error);
    const alertStore = useAlertStore.getState();
    alertStore.setAlert("error", errMsg);

    const status = response?.status;
    if (status === 401) {
      userStore.getState().actions.clearUserInfoAndToken();
    }
    return Promise.reject(error);
  }
);

class APIClient {
  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  request(config) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default new APIClient();
