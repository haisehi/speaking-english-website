import { Sparkles, Twitter, Facebook, Instagram, Github } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">AI English</span>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Learn English smarter with AI-powered tools and gamified experiences.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Twitter className="w-5 h-5 text-gray-600" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Facebook className="w-5 h-5 text-gray-600" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Instagram className="w-5 h-5 text-gray-600" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <Github className="w-5 h-5 text-gray-600" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">AI Speaking</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Games</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        © 2025 AI English. All rights reserved. Built with ❤️ for learners worldwide.
                    </p>
                </div>
            </div>
        </footer>
    )
}