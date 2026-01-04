import axiosClient from "@/lib/axios";

/* ===== GET ALL TESTS ===== */
export const getAllTests = () => {
  return axiosClient.get("/tests");
};

/* ===== CREATE TEST ===== */
export const createTest = (data) => {
  return axiosClient.post("/tests", {
    testName: data.testName,
    description: data.description,
    examTime: Number(data.examTime),
    type: data.type,
    maxNumberOfExams: Number(data.maxExams),
    level: data.level,
    passingScore: Number(data.passing),
    status: data.status === "Active" ? 1 : 0,
    courseId: Number.parseInt(data.course, 10),
  });
};

/* ===== UPDATE TEST ===== */
export const updateTest = (testId, data) => {
  return axiosClient.put(`/tests/${testId}`, {
    testName: data.testName,
    description: data.description,
    examTime: Number(data.examTime),
    type: data.type,
    maxNumberOfExams: Number(data.maxExams),
    level: data.level,
    passingScore: Number(data.passing),
    status: data.status === "Active" ? 1 : 0,
    courseId: Number.parseInt(data.course, 10),
  });
};

/* ===== DELETE TEST ===== */
export const deleteTest = (testId) => {
  return axiosClient.delete(`/tests/${testId}`);
};
