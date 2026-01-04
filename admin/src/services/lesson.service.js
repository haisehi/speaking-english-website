import axiosClient from "@/lib/axios";

/* ===== GET ALL LESSONS ===== */
export const getAllLessons = () => {
  return axiosClient.get("/lessons");
};

/* ===== CREATE LESSON ===== */
export const createLesson = (data) => {
  return axiosClient.post("/lessons", {
    lessonName: data.lessonName,
    content: data.lessonContent,
    attachments: data.attachmentUrl,
    level: Number(data.level.replace("level", "")),
    courseId: Number.parseInt(data.course, 10),
  });
};

/* ===== UPDATE LESSON ===== */
export const updateLesson = (lessonId, data) => {
  return axiosClient.put(`/lessons/${lessonId}`, {
    lessonName: data.lessonName,
    content: data.lessonContent,
    attachments: data.attachmentUrl,
    level: Number(data.level.replace("level", "")),
    courseId: Number.parseInt(data.course, 10),
  });
};

/* ===== DELETE LESSON ===== */
export const deleteLesson = (lessonId) => {
  return axiosClient.delete(`/lessons/${lessonId}`);
};
