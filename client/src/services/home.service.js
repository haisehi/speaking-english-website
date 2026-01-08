import axiosClient from "../lib/axios";

// Lấy bài học gần nhất của người dùng
export const getLatestLesson = () => {
  return axiosClient.get("/user-lesson/latest");
};

// Lấy lịch điểm danh của người dùng theo userId
export const getAttendanceHistory = (userId) => {
  return axiosClient.get(`/attendance/history/${userId}`);
};

// Lấy tất cả khoá học theo user
export const getAllCoursesByUser = () => {
  return axiosClient.get("/courses/all-course-by-user");
};

// Thêm khoá học vào userCourse
export const enrollCourse = (courseId, studentCode, role = "USER", status = "1") => {
  return axiosClient.post("/user-courses/enroll", {
    courseId,
    studentCode,
    role,
    status,
  });
};
