import axiosClient from "@/lib/axios";

export const getAllUsers = () => {
  return axiosClient.get("/users");
};

export const getLeaderboard = () => {
  return axiosClient.get("/user-test/leaderboard");
};

/* ===== GET USER DETAIL ===== */
export const getUserById = (id) => {
  return axiosClient.get(`/users/${id}`);
};
