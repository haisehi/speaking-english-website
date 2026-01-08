import axiosClient from "../lib/axios";

// Lấy danh sách câu hỏi theo testId
export const getQuestionsByTestId = (testId) => {
  return axiosClient.get(`/questions/test/${testId}`);
};

// Lưu kết quả bài test
export const saveUserTestResult = (payload) => {
  return axiosClient.post("/user-test/save", payload);
};
