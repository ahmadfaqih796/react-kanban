import apiClient from "../apiClient";

export const UserApi = {
  SignIn: "/login",
  SignUp: "/auth/signup",
  Logout: "/auth/logout",
  Refresh: "/auth/refresh",
  User: "/user",
};

const signin = (data) => apiClient.post({ url: UserApi.SignIn, data });
const signup = (data) => apiClient.post({ url: UserApi.SignUp, data });
const logout = () => apiClient.get({ url: UserApi.Logout });
const findById = (id) => apiClient.get({ url: `${UserApi.User}/${id}` });

export default {
  signin,
  signup,
  findById,
  logout,
};
