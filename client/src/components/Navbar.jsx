import { Sparkles } from 'lucide-react'
import { Link } from 'wouter'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-900">AI English</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                    href="/login"
                    className="text-gray-700 font-medium hover:text-gray-900"
                    >
                    Login
                    </Link>

                    <Link
                    href="/register"
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-shadow"
                    >
                    Sign Up
                    </Link>

                </div>
            </div>
        </nav>
    )
}