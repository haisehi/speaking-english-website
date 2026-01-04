import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Sarah Kim',
        role: 'University Student',
        avatar: 'SK',
        color: 'from-cyan-400 to-blue-500',
        text: '"I improved my pronunciation in 2 weeks thanks to the AI! The real-time feedback is incredible and keeps me motivated."'
    },
    {
        name: 'Michael Chen',
        role: 'Business Professional',
        avatar: 'MC',
        color: 'from-pink-400 to-purple-500',
        text: '"The chatbot tutor feels like talking to a real person. It helped me prepare for my English presentation at work."'
    },
    {
        name: 'Emma Wilson',
        role: 'High School Student',
        avatar: 'EW',
        color: 'from-orange-400 to-red-500',
        text: '"Learning through games is so fun! I never thought English could be this enjoyable. My grades improved significantly."'
    },
    {
        name: 'Yuki Tanaka',
        role: 'Designer',
        avatar: 'YT',
        color: 'from-green-400 to-emerald-500',
        text: '"The story mode is beautifully designed. It feels like reading a light novel while learning English naturally."'
    },
    {
        name: 'David Park',
        role: 'Engineer',
        avatar: 'DP',
        color: 'from-blue-400 to-cyan-500',
        text: '"Daily missions keep me consistent. I love tracking my progress and seeing my improvement over time."'
    },
    {
        name: 'Lisa Johnson',
        role: 'Teacher',
        avatar: 'LJ',
        color: 'from-purple-400 to-pink-500',
        text: '"As an educator, I appreciate the pedagogical approach. The AI adapts to each learner\'s pace perfectly."'
    }
]

export default function Testimonials() {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Success Stories
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Loved by 50,000+ Learners
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands who have transformed their English skills with AI-powered learning.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}