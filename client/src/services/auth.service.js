import axiosClient from "../lib/axios";

export const login = (data) => {
  return axiosClient.post("/auth/authenticate", data);
};

export const register = (data) => {
  return axiosClient.post("/auth/register", data);
};
