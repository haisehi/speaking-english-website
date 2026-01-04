import { Link } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, Repeat, Trash2, Volume2, Copy } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'

const quickPhrases = [
    'Hello',
    'Thank you',
    'Good morning',
    'How are you',
    'Goodbye'
]

export default function Translate() {
    const [sourceLang, setSourceLang] = useState('English')
    const [targetLang, setTargetLang] = useState('Vietnamese')
    const [inputText, setInputText] = useState('')
    const [translatedText, setTranslatedText] = useState('')

    const handleSwapLanguages = () => {
        setSourceLang(targetLang)
        setTargetLang(sourceLang)
        setInputText(translatedText)
        setTranslatedText(inputText)
    }

    const handleClearInput = () => {
        setInputText('')
        setTranslatedText('')
    }

    const handleListen = (text) => {
        if (text && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = sourceLang === 'English' ? 'en-US' : 'vi-VN'
            window.speechSynthesis.speak(utterance)
        }
    }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    }

    const handleQuickPhrase = (phrase) => {
        setInputText(phrase)
        const mockTranslations = {
            'Hello': 'Xin chào',
            'Thank you': 'Cảm ơn',
            'Good morning': 'Chào buổi sáng',
            'How are you': 'Bạn khỏe không',
            'Goodbye': 'Tạm biệt'
        }
        setTranslatedText(mockTranslations[phrase] || '')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
<Header/>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Language Selector */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                        className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                        <option>English</option>
                        <option>Vietnamese</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>

                    <button
                        onClick={handleSwapLanguages}
                        className="w-14 h-14 bg-cyan-400 hover:bg-cyan-500 rounded-2xl flex items-center justify-center transition-colors shadow-md"
                    >
                        <Repeat className="w-6 h-6 text-white" />
                    </button>

                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-400 cursor-pointer"
                    >
                        <option>Vietnamese</option>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>

                {/* Translation Boxes */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Input Box */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-900">Input Text</h3>
                            <button
                                onClick={handleClearInput}
                                className="text-red-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type or paste text here..."
                            className="w-full h-64 bg-gray-50 rounded-xl p-4 text-gray-900 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-200 mb-3"
                        />
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{inputText.length} characters</span>
                            <button
                                onClick={() => handleListen(inputText)}
                                disabled={!inputText}
                                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Volume2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Listen</span>
                            </button>
                        </div>
                    </div>

                    {/* Translation Box */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-semibold text-gray-900">Translation</h3>
                            <button
                                onClick={() => handleCopy(translatedText)}
                                disabled={!translatedText}
                                className="text-gray-400 hover:text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="w-full h-64 bg-purple-50 rounded-xl p-4 text-gray-900 text-base mb-3 overflow-y-auto border border-purple-100">
                            {translatedText || <span className="text-gray-400">Translation will appear here...</span>}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{translatedText.length} characters</span>
                            <button
                                onClick={() => handleListen(translatedText)}
                                disabled={!translatedText}
                                className="text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Volume2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Listen</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Phrases */}
                <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Phrases</h3>
                    <div className="flex flex-wrap gap-3">
                        {quickPhrases.map((phrase, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickPhrase(phrase)}
                                className="px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-all shadow-sm"
                            >
                                {phrase}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}