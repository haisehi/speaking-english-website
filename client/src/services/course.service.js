import axiosClient from "../lib/axios";

// Lấy danh sách khóa học của user
export const getMyCourses = () => {
  return axiosClient.get("/user-courses/me");
};

// Lấy danh sách bài test theo courseId
export const getTestsByCourseId = (courseId) => {
  return axiosClient.get(`/user-test/ranked-tests?courseId=${courseId}`);
};
