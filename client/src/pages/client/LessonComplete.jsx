import { Link, useRoute, useLocation } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, Trophy, Flame, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'

export default function LessonComplete() {
    const [, params] = useRoute('/lesson-complete/:id')
    const [, setLocation] = useLocation()
    const lessonId = params?.id
    const [showCheckedIn, setShowCheckedIn] = useState(false)

    // Mock data - có thể customize theo lesson
    const stats = {
        wordsLearned: 5,
        accuracy: 100,
        xpEarned: 50
    }

    const handleCheckIn = () => {
        setShowCheckedIn(true)
        // Sau 2 giây chuyển về trang signup
        setTimeout(() => {
            setLocation('/home')
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-6 py-16 text-center">
                {/* Trophy Icon with Soft Yellow Glow */}
                <div className="mb-8 inline-block relative">
                    {/* Soft Yellow Glow - Larger and Lighter */}
                    <div className="absolute -inset-8 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>

                    {/* Trophy Circle */}
                    <div className="relative w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Trophy className="w-16 h-16 text-white" />
                    </div>
                </div>

                {/* Congratulations Text */}
                <h1 className="text-5xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                    Congratulations!
                </h1>
                <p className="text-xl text-gray-600 mb-12">You've completed the lesson! Great job!</p>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Words Learned */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-5xl font-semibold text-blue-500 mb-2">{stats.wordsLearned}</div>
                        <p className="text-gray-600">Words Learned</p>
                    </div>

                    {/* Accuracy */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-5xl font-semibold text-purple-500 mb-2">{stats.accuracy}%</div>
                        <p className="text-gray-600">Accuracy</p>
                    </div>

                    {/* XP Earned */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                        <div className="text-5xl font-semibold text-orange-500 mb-2">+{stats.xpEarned}</div>
                        <p className="text-gray-600">XP Earned</p>
                    </div>
                </div>

                {/* Checked In Notification */}
                {showCheckedIn && (
                    <div className="mb-6 bg-gradient-to-r from-orange-100 via-pink-100 to-orange-100 border border-orange-200 rounded-3xl p-8 animate-fade-in">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <Flame className="w-8 h-8 text-orange-500" />
                            <PartyPopper className="w-8 h-8 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Checked In!</h2>
                        <p className="text-gray-700 mb-1">Amazing! You're on a 5-day streak now!</p>
                        <p className="text-sm text-gray-600">Keep learning every day to build your English skills! 💪</p>
                        <p className="text-sm text-gray-500 mt-3 italic">Redirecting to home...</p>
                    </div>
                )}

                {/* Check-in Button */}
                {!showCheckedIn && (
                    <>
                        <button
                            onClick={handleCheckIn}
                            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto mb-3"
                        >
                            <Flame className="w-6 h-6" />
                            Check-in Today
                        </button>
                        <p className="text-sm text-gray-500">Keep your streak alive!</p>
                    </>
                )}
            </div>
        </div>
    )
}