import { useState } from 'react'
import { Link } from 'wouter'
import {
    Sparkles,
    Home as HomeIcon,
    Mic,
    BookOpen,
    Languages
} from 'lucide-react'

export default function Header() {
    const [showUserMenu, setShowUserMenu] = useState(false)

    const userName = 'Quang Huy'

    const handleLogout = () => {
        console.log('Logout')
        // TODO: clear token / call API / redirect
    }

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-900">
                        AI English
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/home"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>Home</span>
                    </Link>

                    <Link
                        href="/speaking"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <Mic className="w-5 h-5" />
                        <span>Speaking Practice</span>
                    </Link>

                    <Link
                        href="/courses"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Courses</span>
                    </Link>

                    <Link
                        href="/translate"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <Languages className="w-5 h-5" />
                        <span>Translate</span>
                    </Link>
                </div>

                {/* User Section with Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            QH
                        </div>
                        <span className="font-medium text-gray-900">
                            {userName}
                        </span>
                    </button>

                    {showUserMenu && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowUserMenu(false)}
                            />

                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-20">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="font-semibold text-gray-900">
                                        {userName}
                                    </p>
                                </div>

                                <Link href="/profile">
                                    <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Profile</span>
                                    </button>
                                </Link>

                                <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </button>

                                <div className="border-t border-gray-100 mt-2 pt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Log out</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
