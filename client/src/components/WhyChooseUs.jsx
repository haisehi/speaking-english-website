import { Target, Gamepad2, Mic, Sparkles } from 'lucide-react'

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Why Choose Us
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose Our AI English Platform?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of language learning with cutting-edge AI technology and engaging content.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Learning Path</h3>
                        <p className="text-gray-600 leading-relaxed">
                            AI adapts difficulty, lesson flow, and speaking tasks to match your unique learning style and pace.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-6">
                            <Gamepad2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Play-to-Learn Experience</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Gamified mini games, rewards, and streaks make learning English fun and addictive.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-6">
                            <Mic className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Accurate Voice Recognition</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Professional-grade speech scoring with real-time waveform analysis for perfect pronunciation.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Anime-Styled Motivation</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Light anime illustrations and engaging storytelling keep learners inspired and motivated.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}