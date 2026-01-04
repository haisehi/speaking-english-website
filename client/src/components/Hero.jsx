import { Sparkles, Mic, MessageSquare } from 'lucide-react'

export default function Hero() {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white relative overflow-hidden">
            {/* Decorative stars */}
            <Sparkles className="absolute top-20 left-20 w-6 h-6 text-blue-400 animate-pulse" />
            <Sparkles className="absolute top-40 right-32 w-4 h-4 text-cyan-400 animate-pulse" />
            <Sparkles className="absolute bottom-32 left-1/3 w-5 h-5 text-blue-300 animate-pulse" />
            <Sparkles className="absolute bottom-20 right-20 w-4 h-4 text-cyan-300 animate-pulse" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left content */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Learning Platform
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Learn English Smarter with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">AI</span>
                        {' '}— Speak, Play, and Improve Effortlessly.
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        AI analyzes your pronunciation, an intelligent chatbot helps you practice, and gamified lessons keep you motivated.
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Start Learning
                        </button>
                        <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 transition-colors">
                            Try Demo
                        </button>
                    </div>

                    <div className="flex gap-12 mt-12">
                        <div>
                            <div className="text-4xl font-bold text-gray-900">50K+</div>
                            <div className="text-gray-600 text-sm">Active Learners</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-gray-900">4.9/5</div>
                            <div className="text-gray-600 text-sm">User Rating</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-gray-900">95%</div>
                            <div className="text-gray-600 text-sm">Success Rate</div>
                        </div>
                    </div>
                </div>

                {/* Right content - Book image */}
                <div className="relative">
                    <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
                        <img
                            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop"
                            alt="English Learning Book"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>

                    {/* Floating badges */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                            <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">Pronunciation</div>
                            <div className="text-xs text-gray-500">98% Accuracy</div>
                        </div>
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl p-4 flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-white" />
                        <div className="text-white">
                            <div className="text-sm font-semibold">AI Chatbot</div>
                            <div className="text-xs opacity-90">24/7 Practice</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}