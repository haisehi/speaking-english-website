import { Link } from 'wouter'
import {
  BookOpen,
  Users,
  ChevronRight,
  Clock,
  Calendar,
  Target,
  Award
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { getMyCourses, getTestsByCourseId } from '../../services/course.service'

export default function AllCourses() {
  const [courses, setCourses] = useState([])
  const [testsMap, setTestsMap] = useState({}) // { courseId: [] }

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await getMyCourses()
      setCourses(res.data)

      // load tests cho từng course
      res.data.forEach(course => {
        fetchTests(course.courseId)
      })
    } catch (err) {
      console.error("Failed to load courses", err)
    }
  }

  const fetchTests = async (courseId) => {
    try {
      const res = await getTestsByCourseId(courseId)
      setTestsMap(prev => ({
        ...prev,
        [courseId]: res.data
      }))
    } catch (err) {
      console.error("Failed to load tests", err)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-600'
      case 'Intermediate':
        return 'bg-blue-100 text-blue-600'
      case 'Advanced':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">All Courses</h1>
          <p className="text-gray-600">
            Choose a course to start your English learning journey
          </p>
        </div>

        {/* Courses List */}
        <div className="space-y-12">
          {courses.map(course => (
            <div key={course.courseId}>
              {/* Course Card */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      course.image ||
                      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&h=400&fit=crop'
                    }
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                    {course.courseCode}
                  </div>

                  {course.statusCourse === 1 && (
                    <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-medium text-green-600 flex items-center gap-2 shadow-md">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Active
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-blue-500 group-hover:text-cyan-500 transition-colors mb-3">
                    {course.courseName}
                  </h2>

                  <div className="flex items-center justify-between text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">{course.maxQuantity} seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm">ID: {course.courseId}</span>
                    </div>
                  </div>

                  <Link href={`/course/${course.courseId}`}>
                    <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-2xl font-semibold hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
                      View Lessons
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Tests */}
              {testsMap[course.courseId]?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Tests for {course.courseName}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {testsMap[course.courseId].map(test => (
                      <div
                        key={test.testId}
                        className="bg-white rounded-3xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${getLevelColor(test.level)}`}>
                            {test.level}
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-500 transition-colors mb-1">
                          {test.testName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {test.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>{test.examTime} mins</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>{test.examDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Target className="w-4 h-4 text-green-500" />
                            <span>Score: {test.score}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4 text-purple-500" />
                            <span>{test.maxNumberOfExams} attempts</span>
                          </div>
                        </div>

                        <Link href={`/test/${test.testId}`}>
                          <button className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-2xl font-semibold hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
                            Start Test
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
