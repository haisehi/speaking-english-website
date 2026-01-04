import { Mic, MessageSquare, Trophy, Target } from 'lucide-react'

export default function LearnAnywhere() {
    return (
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Learn Anywhere, Anytime
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Available on all your devices with seamless synchronization.
                </p>

                <div className="relative max-w-md mx-auto">
                    {/* Floating icons */}
                    <div className="absolute -left-12 top-12 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                        <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -right-12 top-32 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -left-8 bottom-24 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.4s' }}>
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -right-8 bottom-12 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.6s' }}>
                        <Target className="w-6 h-6 text-white" />
                    </div>

                    {/* Phone mockup */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
                        <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/16]">
                            <img
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop"
                                alt="Mobile App"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}