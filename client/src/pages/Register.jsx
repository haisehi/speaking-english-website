import { Link, useLocation } from 'wouter'
import { register } from "../services/auth.service";
import {
    Sparkles,
    ArrowLeft,
    User,
    Mail,
    Lock,
    Phone,
    Upload
} from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [, setLocation] = useLocation()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
        await register({
            fullName,
            email,
            password,
            phone,
            avatar: 'default-avatar.png',
            role: 'USER'
        })

        // đăng ký xong → về login
        setLocation('/login')
    } catch (err) {
        const msg =
            err.response?.data?.message ||
            'Register failed. Please try again.'
        setError(msg)
    } finally {
        setLoading(false)
    }
}


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 flex items-center justify-center p-6">
            {/* Back to Home */}
            <Link href="/">
                <button className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>
            </Link>

            {/* Registration Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-blue-500">
                            AI English
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Your Account
                    </h1>
                    <p className="text-gray-600">
                        Start your AI-powered learning journey today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Avatar */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                            Profile Avatar
                        </label>
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-gray-400" />
                                </div>
                                <button
                                    type="button"
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                                >
                                    <Upload className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Full Name & Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password & Phone */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-center text-red-500 font-medium">
                            {error}
                        </p>
                    )}

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) =>
                                setAgreedToTerms(e.target.checked)
                            }
                            required
                        />
                        <span className="text-sm text-gray-600">
                            I agree to the Terms & Privacy Policy
                        </span>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!agreedToTerms || loading}
                        className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3.5 rounded-xl font-semibold text-lg disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>

                    {/* Login */}
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login">
                            <a className="text-blue-500 font-semibold">
                                Sign In
                            </a>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
