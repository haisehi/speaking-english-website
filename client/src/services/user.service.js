import axiosClient from "../lib/axios";

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = () => {
  return axiosClient.get("/users/me");
};

// Logout
export const logoutUser = () => {
  return axiosClient.post("/auth/logout");
};

// Lấy leaderboard
export const getLeaderboard = () => {
  return axiosClient.get("/user-test/leaderboard");
};

// Lấy bài học gần nhất của người dùng
export const getLatestLesson = () => {
  return axiosClient.get("/user-lesson/latest");
};

// Lấy streak điểm danh của người dùng theo userId
export const getAttendanceStreak = (userId) => {
  return axiosClient.get(`/attendance/streak/${userId}`);
};
