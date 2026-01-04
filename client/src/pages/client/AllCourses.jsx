import { Link } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, Users, ChevronRight, Clock, Calendar, Target, Award } from 'lucide-react'
import Header from '../../components/Header'

const coursesData = [
    {
        id: 1,
        code: 'ENG101',
        title: 'Basic English Grammar',
        seats: 30,
        lessons: 3,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&h=400&fit=crop',
        gradient: 'from-cyan-400/70 to-blue-500/70',
        active: true,
        tests: [
            {
                id: 1,
                title: 'Basic Grammar Test 1',
                subtitle: 'Basic English Grammar - Test 1',
                duration: '60 mins',
                date: '2024-01-10',
                pass: '50%',
                attempts: 10,
                level: 'Beginner',
                levelColor: 'bg-green-100 text-green-600'
            },
            {
                id: 2,
                title: 'Basic Grammar Test 2',
                subtitle: 'Basic English Grammar - Test 2',
                duration: '90 mins',
                date: '2024-01-17',
                pass: '60%',
                attempts: 10,
                level: 'Beginner',
                levelColor: 'bg-green-100 text-green-600'
            }
        ]
    },
    {
        id: 2,
        code: 'ENG102',
        title: 'Intermediate English Grammar',
        seats: 25,
        lessons: 2,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&h=400&fit=crop',
        gradient: 'from-pink-400/70 to-purple-500/70',
        active: true,
        tests: [
            {
                id: 3,
                title: 'Intermediate Grammar Test 1',
                subtitle: 'Intermediate English Grammar - Test 1',
                duration: '75 mins',
                date: '2024-01-15',
                pass: '65%',
                attempts: 10,
                level: 'Intermediate',
                levelColor: 'bg-blue-100 text-blue-600'
            }
        ]
    },
    {
        id: 3,
        code: 'ENG103',
        title: 'Advanced English Grammar',
        seats: 20,
        lessons: 0,
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1000&h=400&fit=crop',
        gradient: 'from-orange-400/70 to-red-500/70',
        active: true,
        tests: [
            {
                id: 4,
                title: 'Advanced Grammar Test 1',
                subtitle: 'Advanced English Grammar - Test 1',
                duration: '120 mins',
                date: '2024-01-20',
                pass: '70%',
                attempts: 10,
                level: 'Advanced',
                levelColor: 'bg-purple-100 text-purple-600'
            }
        ]
    }
]

export default function AllCourses() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-blue-500 mb-2">All Courses</h1>
                    <p className="text-gray-600">Choose a course to start your English learning journey</p>
                </div>

                {/* Courses List */}
                <div className="space-y-12">
                    {coursesData.map((course) => (
                        <div key={course.id}>
                            {/* Course Card */}
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                {/* Course Image Header */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay - fades on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${course.gradient} transition-opacity duration-300 group-hover:opacity-0`} />

                                    {/* Code Badge - Bottom Left */}
                                    <div className="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                                        {course.code}
                                    </div>

                                    {/* Active Badge - Top Right with Check Icon */}
                                    {course.active && (
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
                                        {course.title}
                                    </h2>
                                    <div className="flex items-center justify-between text-gray-600 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            <span className="text-sm">{course.seats} seats</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            <span className="text-sm">ID: {course.id}</span>
                                        </div>
                                    </div>

                                    {/* View Lessons Button - Full Width */}
                                    <Link href={`/course/${course.id}`}>
                                        <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-2xl font-semibold hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
                                            View Lessons
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Tests Section */}
                            {course.tests && course.tests.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                        Tests for {course.title}
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {course.tests.map((test) => (
                                            <div
                                                key={test.id}
                                                className="bg-white rounded-3xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                                            >
                                                {/* Test Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                                                        <Award className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className={`px-3 py-1.5 ${test.levelColor} rounded-full text-sm font-medium`}>
                                                        {test.level}
                                                    </div>
                                                </div>

                                                {/* Test Info */}
                                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-500 transition-colors mb-1">
                                                    {test.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-4">{test.subtitle}</p>

                                                {/* Test Stats */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4 text-orange-500" />
                                                        <span>{test.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4 text-blue-500" />
                                                        <span>{test.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Target className="w-4 h-4 text-green-500" />
                                                        <span>Pass: {test.pass}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Users className="w-4 h-4 text-purple-500" />
                                                        <span>{test.attempts} attempts</span>
                                                    </div>
                                                </div>

                                                {/* Start Test Button */}
                                                <Link href={`/test/${test.id}`}>
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