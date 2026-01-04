import { Link, useLocation } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, ChevronLeft, ChevronRight, Flame, Check, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'

const slides = [
    {
        title: 'Perfect Your Pronunciation',
        description: 'Real-time AI feedback for native-like speech',
        gradient: 'from-pink-400 via-purple-400 to-pink-300',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
    },
    {
        title: 'Master English Grammar',
        description: 'Learn the fundamentals with AI-powered lessons',
        gradient: 'from-cyan-400 via-blue-400 to-cyan-300',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop'
    },
    {
        title: 'Play & Learn',
        description: 'Gamified lessons that make learning fun',
        gradient: 'from-orange-400 via-red-400 to-orange-300',
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=400&fit=crop'
    }
]

const courses = [
    {
        id: 1,
        code: 'ENG101',
        title: 'Basic English Grammar',
        seats: 30,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop',
        gradient: 'from-cyan-400/70 to-blue-500/70',
        active: true
    },
    {
        id: 2,
        code: 'ENG102',
        title: 'Intermediate English Grammar',
        seats: 25,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
        gradient: 'from-pink-400/70 to-purple-500/70',
        active: true
    },
    {
        id: 3,
        code: 'ENG201',
        title: 'Advanced Conversation',
        seats: 20,
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=300&fit=crop',
        gradient: 'from-orange-400/70 to-red-500/70',
        active: true
    }
]

export default function Signup() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [userName] = useState('Quang Huy')
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [, setLocation] = useLocation()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const handleLogout = () => {
        setLocation('/')
    }

    const streakDays = [
        { day: 'Mon', active: true },
        { day: 'Tue', active: true },
        { day: 'Wed', active: true },
        { day: 'Thu', active: false },
        { day: 'Fri', active: true },
        { day: 'Sat', active: false },
        { day: 'Sun', active: false }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="relative mb-8">
                    <div className={`relative h-64 rounded-3xl bg-gradient-to-r ${slides[currentSlide].gradient} overflow-hidden shadow-xl`}>
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `url(${slides[currentSlide].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div className="relative h-full flex items-center justify-center text-center">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-3">{slides[currentSlide].title}</h2>
                                <p className="text-white text-lg opacity-90">{slides[currentSlide].description}</p>
                            </div>
                        </div>
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-colors">
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-colors">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {slides.map((_, index) => (
                                <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="text-sm text-gray-500">Your Latest Lesson</p>
                                    <h3 className="text-xl font-bold text-gray-900">Grammar Basics</h3>
                                    <p className="text-sm text-gray-600">Introduction to English Grammar</p>
                                </div>
                                <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">Level 1</div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-semibold text-gray-900">25%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full w-1/4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                                </div>
                            </div>
                            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
                                Continue Lesson
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Flame className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Daily Streak</h3>
                                <p className="text-xs text-gray-500">Keep your learning streak alive!</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-500">4 days</div>
                            <p className="text-xs text-gray-400">Current Streak</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        {streakDays.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-2">{item.day}</div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-700 ${item.active ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md hover:rotate-[360deg] cursor-pointer' : 'bg-gray-100'}`}>
                                    {item.active ? <Check className="w-5 h-5 text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
                        <button className="text-blue-500 font-semibold hover:text-blue-600">View All</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <Link key={course.id} href={`/course/${course.id}`}>
                                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-80`} />
                                        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-700">
                                            {course.code}
                                        </div>
                                        {course.active && (
                                            <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 rounded-lg text-xs font-semibold text-white flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                Active
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{course.title}</h3>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Available Seats</span>
                                            <span className="font-semibold text-gray-900">{course.seats}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}