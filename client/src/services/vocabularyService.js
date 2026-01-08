import axiosClient from '../lib/axios'

// Lấy danh sách từ vựng theo lessonId
export const getVocabulariesByLessonId = (lessonId) => {
    return axiosClient.get(`/vocabularies/lesson/${lessonId}`)
}

// Start / update progress bài học
export const startOrUpdateLesson = (data) => {
    return axiosClient.post('/user-lesson/start-or-update-lesson', data)
}

// ✅ ĐIỂM DANH (MỖI NGÀY 1 LẦN)
export const markAttendance = (userId) => {
    return axiosClient.post(
        `/attendance/mark`,
        null,
        {
            params: { userId }
        }
    )
}
