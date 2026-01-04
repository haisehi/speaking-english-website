import axiosClient from "@/lib/axios";

/* ===== GET ALL VOCABULARIES ===== */
export const getVocabularies = () => {
  return axiosClient.get("/vocabularies");
};

/* ===== CREATE ===== */
export const createVocabulary = (data) => {
  return axiosClient.post("/vocabularies", {
    word: data.word,
    meaning: data.meaning,
    description: data.description,
    image: data.image,
    audio: data.audio,
    lessonId: Number(data.lessonId),
  });
};

/* ===== UPDATE ===== */
export const updateVocabulary = (vocabId, data) => {
  return axiosClient.put(`/vocabularies/${vocabId}`, {
    word: data.word,
    meaning: data.meaning,
    description: data.description,
    image: data.image,
    audio: data.audio,
    lessonId: Number(data.lessonId),
  });
};

/* ===== DELETE ===== */
export const deleteVocabulary = (vocabId) => {
  return axiosClient.delete(`/vocabularies/${vocabId}`);
};
