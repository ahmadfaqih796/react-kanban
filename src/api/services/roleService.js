import apiClient from "../apiClient";

export const RoleApi = {
  Path: "/department",
};

const findAll = (params) => apiClient.get({ url: RoleApi.Path, params });
const findById = (id) => apiClient.get({ url: `${RoleApi.Path}/${id}` });
const deleteById = (id) => apiClient.delete({ url: `${RoleApi.Path}/${id}` });

export default {
  findAll,
  findById,
  deleteById,
};
