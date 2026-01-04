import axiosClient from "@/lib/axios";

/* ===== GET ALL COURSES ===== */
export const getAllCourses = () => {
  return axiosClient.get("/courses");
};

/* ===== CREATE COURSE ===== */
export const createCourse = (data) => {
  return axiosClient.post("/courses", {
    courseName: data.courseName,
    courseCode: data.courseCode,
    maxQuantity: Number(data.maxQuantity),
    statusCourse: data.status === "Active" ? 1 : 0,
    image: data.imageUrl,
  });
};

/* ===== UPDATE COURSE ===== */
export const updateCourse = (courseId, data) => {
  return axiosClient.put(`/courses/${courseId}`, {
    courseName: data.courseName,
    courseCode: data.courseCode,
    maxQuantity: Number(data.maxQuantity),
    status: data.status === "Active" ? 1 : 0,
    image: data.imageUrl,
  });
};
