import { Mic, MessageSquare, Gamepad2, TrendingUp, Target, Trophy, Book } from 'lucide-react'

export default function Features() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Powerful Features
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Everything You Need to Master English
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        AI-powered tools, gamification, and personalized learning paths designed for your success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* AI Speech Analysis */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6">
                            <Mic className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">AI Speech Analysis</h3>
                        <p className="text-gray-600 mb-6">Real-time pronunciation scoring with advanced waveform analysis.</p>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Completion Rate</span>
                            <span className="font-semibold text-gray-900">85%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-gradient-to-r from-cyan-400 to-blue-500" />
                        </div>
                    </div>

                    {/* AI Chatbot Tutor */}
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-6">
                            <MessageSquare className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">AI Chatbot Tutor</h3>
                        <p className="text-gray-600 mb-6">Natural conversation topics with instant corrections and feedback.</p>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Completion Rate</span>
                            <span className="font-semibold text-gray-900">65%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full w-[65%] bg-gradient-to-r from-pink-400 to-purple-500" />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4">
                            <Gamepad2 className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Mini Games</h3>
                        <p className="text-sm text-gray-600">Vocabulary & sentence challenges with animated gamified UI.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Progress Tracking</h3>
                        <p className="text-sm text-gray-600">Beautiful dashboards with streaks, and achievement badges.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-4">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Missions</h3>
                        <p className="text-sm text-gray-600">Learn 10 new words, study for 3 minutes, and complete challenges.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4">
                            <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Community & Ranking</h3>
                        <p className="text-sm text-gray-600">Join a friendly community with leaderboards and competitions.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                            <Mic className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Voice Practice Mode</h3>
                        <p className="text-sm text-gray-600">Advanced microphone integration with real-time waveform effects.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4">
                            <Book className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Story Mode Learning</h3>
                        <p className="text-sm text-gray-600">Anime light-novel inspired interactive storytelling lessons.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}