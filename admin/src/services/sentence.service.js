import axios from "@/lib/axios";

/* ===== GET SENTENCES BY LESSON ===== */
export const getSentencesByLesson = (lessonId) => {
  return axios.get(`/sentences/by-lesson/${lessonId}`);
};

/* ===== CREATE SENTENCE ===== */
export const createSentence = (data) => {
  return axios.post("/sentences", data);
};
