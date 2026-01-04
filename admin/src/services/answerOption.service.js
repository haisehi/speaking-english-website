import axiosClient from "@/lib/axios";

/* ===== GET ANSWERS BY QUESTION ID ===== */
export const getAnswersByQuestionId = (questionId) => {
  return axiosClient.get(`/answer-options/question/${questionId}`);
};

/* ===== CREATE ANSWER ===== */
export const createAnswer = (data) => {
  return axiosClient.post("/answer-options", {
    content: data.content,
    correctAnswer: data.correctAnswer, // "0" | "1"
    attachments: data.attachments || null,
    id: Number(data.id), // questionId
  });
};

/* ===== UPDATE ANSWER ===== */
export const updateAnswer = (answerId, data) => {
  return axiosClient.put(`/answer-options/${answerId}`, {
    content: data.content,
    correctAnswer: data.correctAnswer,
    attachments: data.attachments || null,
    id: Number(data.id), // questionId
  });
};

/* ===== DELETE ANSWER ===== */
export const deleteAnswer = (answerId) => {
  return axiosClient.delete(`/answer-options/${answerId}`);
};
