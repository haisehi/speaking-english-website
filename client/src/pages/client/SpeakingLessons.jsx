import { useEffect, useState } from 'react'
import { useRoute, Link } from 'wouter'
import Header from '../../components/Header'
import { getSpeakingLessonsByTopic } from '../../services/speakingService'
import { CheckCircle, XCircle } from 'lucide-react'

export default function SpeakingLessons() {
    const [, params] = useRoute('/speaking/topic/:id')
    const topicId = params.id
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        getSpeakingLessonsByTopic(topicId).then(res => setLessons(res.data))
    }, [topicId])

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">
                    Speaking Lessons
                </h1>

                <div className="space-y-4">
                    {lessons.map(lesson => (
                        <Link key={lesson.lessonId} href={`/speaking/lesson/${lesson.lessonId}`}>
                            <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center cursor-pointer">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {lesson.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {lesson.description}
                                    </p>
                                </div>

                                {lesson.pass ? (
                                    <CheckCircle className="text-green-500" />
                                ) : (
                                    <XCircle className="text-gray-300" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
