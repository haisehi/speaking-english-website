import axiosClient from "@/lib/axios";

export const login = (data) => {
  return axiosClient.post("/auth/authenticate", data);
};
