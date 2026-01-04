import axiosClient from "@/lib/axios";

/* ===== GET ALL SPEAKING LESSONS ===== */
export const getSpeakingLessons = () => {
  return axiosClient.get("/SpeakingLessons");
};

/* ===== CREATE SPEAKING LESSON ===== */
export const createSpeakingLesson = (data) => {
  return axiosClient.post("/SpeakingLessons", {
    topicId: data.topicId,
    title: data.title,
    description: data.description,
  });
};
