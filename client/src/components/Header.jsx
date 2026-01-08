import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import axios from 'axios'
import {
    Sparkles,
    Home as HomeIcon,
    Mic,
    BookOpen,
    Languages
} from 'lucide-react'

export default function Header() {
    const [, setLocation] = useLocation()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [user, setUser] = useState(null)

    // Lấy thông tin người dùng
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token')
            if (!token) return

            try {
                const res = await axios.get('http://localhost:8080/api/v1/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(res.data)
            } catch (err) {
                console.error('Fetch user failed', err)
                localStorage.clear()
                setLocation('/login')
            }
        }
        fetchUser()
    }, [])

    const handleLogout = async () => {
        const token = localStorage.getItem('access_token')
        if (!token) return

        try {
            await axios.post(
                'http://localhost:8080/api/v1/auth/logout',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
        } catch (err) {
            console.error('Logout failed', err)
        } finally {
            localStorage.clear()
            setLocation('/login')
        }
    }

    const userName = user?.fullName || 'User'
    const userInitials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/home" className="flex items-center gap-2">
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

                {/* User Section */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {userInitials}
                        </div>
                        <span className="font-medium text-gray-900">{userName}</span>
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
                                    <p className="font-semibold text-gray-900">{userName}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>

                                <Link href="/profile">
                                    <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                        Profile
                                    </button>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                >
                                    Log out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
