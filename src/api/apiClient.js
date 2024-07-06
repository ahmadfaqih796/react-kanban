import { message as Message } from "antd";
import axios from "axios";

import { t } from "@/locales/i18n";
import userStore from "@/store/userStore";

import { ResultEnum } from "@/types/enum";

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
    config.headers.Authorization = "Bearer Token";
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

    const { status, data, message } = res.data;
    // Jika permintaan bisnis berhasil
    const hasSuccess =
      data && Reflect.has(res.data, "status") && status === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data;
    }

    // Jika terjadi kesalahan pada permintaan bisnis
    throw new Error(message || t("sys.api.apiRequestFailed"));
  },
  (error) => {
    const { response, message } = error || {};

    const errMsg =
      response?.data?.message || message || t("sys.api.errorMessage");
    Message.error(errMsg);

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
