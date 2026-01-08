import axiosClient from '../lib/axios'

// Lấy danh sách chủ đề luyện nói
export const getSpeakingTopics = () => {
    return axiosClient.get('/topics')
}

// Lấy danh sách bài luyện nói theo topicId (có token)
export const getSpeakingLessonsByTopic = (topicId) => {
    return axiosClient.get(`/SpeakingLessons/TopicId/${topicId}/me`)
}

// Lấy danh sách câu theo lessonId
export const getSentencesByLesson = (lessonId) => {
    return axiosClient.get(`/sentences/by-lesson/${lessonId}`)
}

// So sánh câu nói
export const compareSpeakingSentence = (data) => {
    return axiosClient.post('/speaking/compare', data)
}

// Nộp bài luyện nói
export const submitSpeakingLesson = (data) => {
    return axiosClient.post('/speaking/submit', data)
}
