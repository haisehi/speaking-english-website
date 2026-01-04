import axiosClient from "@/lib/axios";

/* ===== GET ALL TOPICS ===== */
export const getTopics = () => {
  return axiosClient.get("/topics");
};

/* ===== CREATE TOPIC ===== */
export const createTopic = (data) => {
  return axiosClient.post("/topics", {
    title: data.title,
    description: data.description,
  });
};

/* ===== DELETE TOPIC ===== */
export const deleteTopic = (id) => {
  return axiosClient.delete(`/topics/${id}`);
};
