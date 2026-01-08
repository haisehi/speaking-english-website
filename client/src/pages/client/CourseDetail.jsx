import { Link, useRoute } from 'wouter'
import { ArrowLeft, ChevronRight, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import axiosClient from '../../lib/axios'

export default function CourseDetail() {
  const [, params] = useRoute('/course/:id')
  const courseId = params?.id

  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    if (courseId) {
      fetchLessons()
    }
  }, [courseId])

  const fetchLessons = async () => {
    try {
      const res = await axiosClient.get(
        `/lessons/user?courseId=${courseId}`
      )

      setLessons(res.data)

      setCourse({
        id: courseId,
        title: res.data?.[0]?.courseName || `Course ${courseId}`,
        code: res.data?.[0]?.courseCode || '',
        description: `${res.data.length} lessons available`
      })
    } catch (err) {
      console.error('Failed to load lessons', err)
    }
  }

  const getLevelUI = (level) => {
    switch (level) {
      case 1:
        return {
          text: 'Level 1',
          color: 'bg-green-100 text-green-600',
          icon: 'bg-green-500'
        }
      case 2:
        return {
          text: 'Level 2',
          color: 'bg-blue-100 text-blue-600',
          icon: 'bg-blue-500'
        }
      case 3:
        return {
          text: 'Level 3',
          color: 'bg-purple-100 text-purple-600',
          icon: 'bg-purple-500'
        }
      default:
        return {
          text: 'Level',
          color: 'bg-gray-100 text-gray-600',
          icon: 'bg-gray-500'
        }
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/courses">
          <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </a>
        </Link>

        {/* Course Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-blue-500 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600">
            {course.code} • {course.description}
          </p>
        </div>

        {/* Lessons Grid */}
        {lessons.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {lessons.map((lesson) => {
              const levelUI = getLevelUI(lesson.level)

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-3xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                >
                  {/* Icon & Level */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 ${levelUI.icon} rounded-2xl flex items-center justify-center`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1.5 ${levelUI.color} rounded-full text-sm font-medium`}>
                      {levelUI.text}
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors mb-2">
                    {lesson.lessonName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-8">
                    {lesson.description}
                  </p>

                  {/* Start */}
                  <Link href={`/lesson/${lesson.lessonId}`}>
                    <a>
                      <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-2xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                        Start Lesson
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </a>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No lessons available yet.</p>
          </div>
        )}
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  )
}
