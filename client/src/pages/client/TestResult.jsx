import { Link, useRoute, useLocation } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages } from 'lucide-react'
import Header from '../../components/Header'

export default function TestResult() {
    const [, params] = useRoute('/test-result/:id')
    const [location] = useLocation()

    // Lấy score và totalQuestions từ URL query params
    const searchParams = new URLSearchParams(location.split('?')[1])
    const score = parseInt(searchParams.get('score') || '0')
    const totalQuestions = parseInt(searchParams.get('total') || '3')
    const correctAnswers = parseInt(searchParams.get('correct') || '0')

    const percentage = Math.round((score / (totalQuestions * 10)) * 100)
    const isPassed = percentage >= 50

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
<Header/>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 py-16 text-center">
                {/* Icon Circle */}
                <div className="mb-8 inline-block">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isPassed ? 'bg-green-500' : 'bg-orange-500'
                        }`}>
                        {isPassed ? (
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h1 className={`text-5xl font-semibold mb-4 ${isPassed ? 'text-green-500' : 'text-orange-500'
                    }`}>
                    {isPassed ? 'Congratulations!' : 'Keep Practicing!'}
                </h1>
                <p className="text-xl text-gray-600 mb-12">
                    {isPassed ? "You've passed the test!" : "You can try again!"}
                </p>

                {/* Score Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className={`text-7xl font-bold mb-3 ${isPassed ? 'text-blue-500' : 'text-blue-500'
                        }`}>
                        {percentage}%
                    </div>
                    <p className="text-gray-600 text-lg font-medium mb-2">Your Score</p>
                    <p className="text-gray-500 text-sm mb-1">{correctAnswers} out of {totalQuestions} correct</p>
                    <p className="text-gray-400 text-sm">Passing Score: 50%</p>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4">
                    <Link href="/courses">
                        <a>
                            <button className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
                                Back to Courses
                            </button>
                        </a>
                    </Link>
                    {!isPassed && (
                        <Link href={`/test/${params?.id}`}>
                            <a>
                                <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-xl transition-shadow">
                                    Try Again
                                </button>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}