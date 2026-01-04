import axiosClient from "@/lib/axios";

/* ===== GET QUESTIONS BY TEST ID ===== */
export const getQuestionsByTestId = (testId) => {
  return axiosClient.get(`/questions/test/${testId}`);
};


/* ===== CREATE QUESTION ===== */
export const createQuestion = (data) => {
  return axiosClient.post("/questions", {
    content: data.content,
    attachments: data.attachments || null,
    type: data.type,
    score: data.score,
    testId: Number(data.testId),
  });
};

/* ===== UPDATE QUESTION ===== */
export const updateQuestion = (questionId, data) => {
  return axiosClient.put(`/questions/${questionId}`, {
    content: data.content,
    attachments: data.attachments || null,
    type: data.type,
    score: data.score,
    testId: Number(data.testId),
  });
};

/* ===== DELETE QUESTION ===== */
export const deleteQuestion = (questionId) => {
  return axiosClient.delete(`/questions/${questionId}`);
};
