import { Link, useRoute } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, ArrowLeft, ChevronRight, Award } from 'lucide-react'
import Header from '../../components/Header'

const coursesData = {
    1: {
        code: 'ENG101',
        title: 'Basic English Grammar',
        description: '3 lessons available',
        lessons: [
            {
                id: 1,
                title: 'Grammar Basics',
                description: 'Introduction to English Grammar',
                level: 'Level 1',
                levelColor: 'bg-green-100 text-green-600',
                icon: 'bg-green-500'
            },
            {
                id: 2,
                title: 'Nouns and Verbs',
                description: 'Understanding Nouns and Verbs',
                level: 'Level 2',
                levelColor: 'bg-blue-100 text-blue-600',
                icon: 'bg-blue-500'
            },
            {
                id: 3,
                title: 'Sentence Structure',
                description: 'Building Simple Sentences',
                level: 'Level 3',
                levelColor: 'bg-purple-100 text-purple-600',
                icon: 'bg-purple-500'
            }
        ]
    },
    2: {
        code: 'ENG102',
        title: 'Intermediate English Grammar',
        description: '2 lessons available',
        lessons: [
            {
                id: 4,
                title: 'Tenses Review',
                description: 'Overview of English Tenses',
                level: 'Level 2',
                levelColor: 'bg-blue-100 text-blue-600',
                icon: 'bg-blue-500'
            },
            {
                id: 5,
                title: 'Conditional Sentences',
                description: 'Using Conditional Sentences',
                level: 'Level 3',
                levelColor: 'bg-purple-100 text-purple-600',
                icon: 'bg-purple-500'
            }
        ]
    },
    3: {
        code: 'ENG103',
        title: 'Advanced English Grammar',
        description: '0 lessons available',
        lessons: []
    }
}

export default function CourseDetail() {
    const [, params] = useRoute('/course/:id')
    const courseId = params?.id
    const course = coursesData[courseId]

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Course not found</h1>
                    <Link href="/signup">
                        <a className="text-blue-500 hover:text-blue-600">Back to Home</a>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Back Button */}
                <Link href="/signup">
                    <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Courses</span>
                    </a>
                </Link>

                {/* Course Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-semibold text-blue-500 mb-2">{course.title}</h1>
                    <p className="text-gray-600">{course.code} • {course.description}</p>
                </div>

                {/* Lessons Grid */}
                {course.lessons.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                        {course.lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className="bg-white rounded-3xl shadow-md p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                {/* Lesson Icon & Level Badge */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-12 h-12 ${lesson.icon} rounded-2xl flex items-center justify-center`}>
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`px-3 py-1.5 ${lesson.levelColor} rounded-full text-sm font-medium`}>
                                        {lesson.level}
                                    </div>
                                </div>

                                {/* Lesson Info */}
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors mb-2">
                                    {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-8">{lesson.description}</p>

                                {/* Start Button */}
                                <Link href={`/lesson/${lesson.id}`}>
                                    <a>
                                        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-2xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                                            Start Lesson
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </a>
                                </Link>
                            </div>
                        ))}
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