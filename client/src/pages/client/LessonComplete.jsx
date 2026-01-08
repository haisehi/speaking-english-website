import { useRoute, useLocation } from 'wouter'
import { Trophy, Flame, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'
import { markAttendance } from '../../services/vocabularyService'

export default function LessonComplete() {
    const [, params] = useRoute('/lesson-complete/:id')
    const [, setLocation] = useLocation()
    const lessonId = params?.id
    const [showCheckedIn, setShowCheckedIn] = useState(false)
    const [loading, setLoading] = useState(false)

    const userId = Number(localStorage.getItem('id_user'))


    // Parse query params (Wouter-safe)
    const searchParams = new URLSearchParams(window.location.search)
    const total = Number(searchParams.get('total') || 0)
    const correct = Number(searchParams.get('correct') || 0)

    //  TÍNH TOÁN
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    const wordsLearned = correct
    const xpEarned = correct * 10

    const handleCheckIn = async () => {
        if (loading) return
        setLoading(true)

        try {
            await markAttendance(userId)

            //  Điểm danh thành công
            setShowCheckedIn(true)

            setTimeout(() => {
                setLocation('/home')
            }, 2000)
        } catch (error) {
            /**
             * Backend rule:
             * - Nếu đã điểm danh trong ngày → backend sẽ throw error
             * → FE vẫn coi là đã check-in
             */
            console.warn('Already checked in today or error:', error)

            setShowCheckedIn(true)
            setTimeout(() => {
                setLocation('/home')
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Header />

            <div className="max-w-3xl mx-auto px-6 py-16 text-center">
                {/* Trophy */}
                <div className="mb-8 inline-block relative">
                    <div className="absolute -inset-8 bg-yellow-200 rounded-full blur-3xl opacity-40" />
                    <div className="relative w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Trophy className="w-16 h-16 text-white" />
                    </div>
                </div>

                <h1 className="text-5xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                    Congratulations!
                </h1>

                <p className="text-xl text-gray-600 mb-12">
                    You've completed the lesson!
                </p>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-5xl font-semibold text-blue-500 mb-2">
                            {wordsLearned}
                        </div>
                        <p className="text-gray-600">Words Learned</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-5xl font-semibold text-purple-500 mb-2">
                            {accuracy}%
                        </div>
                        <p className="text-gray-600">Accuracy</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="text-5xl font-semibold text-orange-500 mb-2">
                            +{xpEarned}
                        </div>
                        <p className="text-gray-600">XP Earned</p>
                    </div>
                </div>

                {/* Check-in */}
                {showCheckedIn && (
                    <div className="mb-6 bg-gradient-to-r from-orange-100 via-pink-100 to-orange-100 border rounded-3xl p-8">
                        <div className="flex justify-center gap-3 mb-3">
                            <Flame className="w-8 h-8 text-orange-500" />
                            <PartyPopper className="w-8 h-8 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                            Checked In!
                        </h2>
                        <p className="text-gray-600">
                            Redirecting to home...
                        </p>
                    </div>
                )}

                {!showCheckedIn && (
                    <button
                        onClick={handleCheckIn}
                        disabled={loading}
                        className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 mx-auto disabled:opacity-60"
                    >
                        <Flame className="w-6 h-6" />
                        {loading ? 'Checking in...' : 'Check-in Today'}
                    </button>
                )}
            </div>
        </div>
    )
}
