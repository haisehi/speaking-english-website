import { Link, useLocation } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, Settings, Check, Flame, Award, Trophy, X, Upload } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'

const leaderboardData = [
    { rank: 1, name: 'Quang Huy', email: 'washi0101@gmail.com', points: 150, avatar: 'QH', color: 'from-orange-400 to-orange-500', you: true },
    { rank: 2, name: 'huy dep trai', email: 'huy@gmail.com', points: 60, avatar: 'H', color: 'from-gray-400 to-gray-500' },
    { rank: 3, name: 'Quang Huy', email: 'huy9101@gmail.com', points: 50, avatar: 'Q', color: 'from-orange-400 to-orange-500' },
    { rank: 4, name: 'SM', email: 'sm1@gmail.com', points: 40, avatar: 'S', color: 'from-blue-400 to-blue-500' }
]

export default function Profile() {
    const [userName, setUserName] = useState('Quang Huy')
    const [phone, setPhone] = useState('0554698561')
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [theme, setTheme] = useState('light')
    const [notifications, setNotifications] = useState(true)
    const [language, setLanguage] = useState('English')
    const [, setLocation] = useLocation()

    const handleLogout = () => {
        setLocation('/')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-500 mb-2">My Profile</h1>
                        <p className="text-gray-600">Track your progress and achievements</p>
                    </div>
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                    >
                        <Settings className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* User Profile Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-lg p-8">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <img
                                    src="https://i.pravatar.cc/150?img=33"
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Quang Huy</h2>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">washi0101@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-6">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm">0554698561</span>
                            </div>

                            <div className="w-full">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Total XP</span>
                                    <span className="text-sm font-bold text-blue-500">2450 / 3000</span>
                                </div>
                                <div className="h-3 bg-white rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '82%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Global Leaderboard</h3>
                                <p className="text-sm text-gray-600">Top performers this month</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {leaderboardData.map((user) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${user.you ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 bg-gradient-to-br ${user.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                                            #{user.rank}
                                        </div>
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                                {user.name}
                                                {user.you && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">You</span>}
                                            </p>
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-500">{user.points}</p>
                                        <p className="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Current Lesson */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="font-bold text-gray-900">Current Lesson</h3>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Grammar Basics</h4>
                        <p className="text-sm text-gray-600 mb-4">Basic English Grammar • ENG101</p>
                        <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600 font-medium">Progress</span>
                                <span className="font-bold text-green-500">25%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }} />
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                            <span className="font-semibold text-green-700">Level 1</span>
                        </div>
                    </div>

                    {/* Daily Streak */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Flame className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="font-bold text-gray-900">Daily Streak</h3>
                        </div>
                        <div className="text-center mb-4">
                            <div className="text-5xl font-bold text-orange-500 mb-1">5</div>
                            <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                                days in a row
                                <Flame className="w-4 h-4 text-orange-400" />
                            </p>
                        </div>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                                <div
                                    key={day}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${i < 5 ? 'bg-orange-500' : 'bg-gray-200'}`}
                                >
                                    {i < 5 && <Check className="w-4 h-4 text-white" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="font-bold text-gray-900">Achievements</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-3 rounded-xl flex items-center gap-2">
                                <Trophy className="w-5 h-5" />
                                <span className="font-semibold">First Lesson</span>
                            </div>
                            <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-3 rounded-xl flex items-center gap-2">
                                <Flame className="w-5 h-5" />
                                <span className="font-semibold">5 Day Streak</span>
                            </div>
                            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-3 rounded-xl flex items-center gap-2">
                                <Check className="w-5 h-5" />
                                <span className="font-semibold">First Test</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettingsModal && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setShowSettingsModal(false)}
                    />

                    {/* Modal */}
                    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                            <button
                                onClick={() => setShowSettingsModal(false)}
                                className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Edit Profile Section - BLUE BACKGROUND */}
                            <div className="bg-blue-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Profile</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                                        <button className="w-full px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-500">
                                            <Upload className="w-5 h-5" />
                                            <span className="font-medium">Upload New Avatar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Theme Section - PINK BACKGROUND */}
                            <div className="bg-pink-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Theme</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${theme === 'light'
                                            ? 'bg-white border-2 border-cyan-400 text-gray-900'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        Light
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${theme === 'dark'
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        Dark
                                    </button>
                                </div>
                            </div>

                            {/* Notifications Section - GREEN BACKGROUND */}
                            <div className="bg-green-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                                    <span className="font-medium text-gray-700">Push Notifications</span>
                                    <button
                                        onClick={() => setNotifications(!notifications)}
                                        className={`relative w-14 h-8 rounded-full transition-colors ${notifications ? 'bg-blue-500' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'
                                            }`} />
                                    </button>
                                </div>
                            </div>

                            {/* Language Section - ORANGE/BEIGE BACKGROUND */}
                            <div className="bg-orange-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Language</h3>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none font-medium text-gray-700"
                                >
                                    <option>English</option>
                                    <option>Vietnamese</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                    <option>German</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}