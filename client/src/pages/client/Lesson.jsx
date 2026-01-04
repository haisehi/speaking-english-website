import { Link, useRoute } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'

const lessonData = {
    1: {
        courseId: 1,
        title: 'Grammar Basics',
        totalQuestions: 5,
        questions: [
            { id: 1, word: 'article', answer: 'mạo từ' },
            { id: 2, word: 'grammar', answer: 'ngữ pháp' },
            { id: 3, word: 'verb', answer: 'động từ' },
            { id: 4, word: 'noun', answer: 'danh từ' },
            { id: 5, word: 'adjective', answer: 'tính từ' }
        ]
    },
    2: {
        courseId: 1,
        title: 'Nouns and Verbs',
        totalQuestions: 5,
        questions: [
            { id: 1, word: 'run', answer: 'to move quickly on foot' },
            { id: 2, word: 'table', answer: 'a piece of furniture with a flat top' },
            { id: 3, word: 'write', answer: 'to make letters or words on paper' },
            { id: 4, word: 'book', answer: 'a set of printed pages bound together' },
            { id: 5, word: 'speak', answer: 'to say words aloud' }
        ]
    },
    3: {
        courseId: 1,
        title: 'Sentence Structure',
        totalQuestions: 5,
        questions: [
            { id: 1, word: 'subject', answer: 'the person or thing doing the action' },
            { id: 2, word: 'predicate', answer: 'the part of a sentence containing the verb' },
            { id: 3, word: 'clause', answer: 'a group of words with a subject and verb' },
            { id: 4, word: 'phrase', answer: 'a group of words without a subject or verb' },
            { id: 5, word: 'sentence', answer: 'a complete thought with a subject and predicate' }
        ]
    }
}

export default function Lesson() {
    const [, params] = useRoute('/lesson/:id')
    const lessonId = params?.id
    const lesson = lessonData[lessonId]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswer, setUserAnswer] = useState('')
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    if (!lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson not found</h1>
                    <Link href="/signup">
                        <a className="text-blue-500 hover:text-blue-600">Back to Dashboard</a>
                    </Link>
                </div>
            </div>
        )
    }

    const question = lesson.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / lesson.totalQuestions) * 100

    const handleCheckAnswer = () => {
        const correct = userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim()
        setIsCorrect(correct)
        setShowFeedback(true)
    }

    const handleNext = () => {
        if (currentQuestion < lesson.totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setUserAnswer('')
            setShowFeedback(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress</span>
                        <span className="text-sm font-bold text-blue-500">{currentQuestion + 1} / {lesson.totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl shadow-xl p-12 mb-6">
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                            Type the Answer
                        </span>
                        <h1 className="text-6xl font-medium text-blue-500 mb-6">{question.word}</h1>
                        <p className="text-lg text-gray-600">What does this word mean?</p>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !showFeedback && handleCheckAnswer()}
                        placeholder="Type the meaning..."
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl text-center text-lg focus:outline-none focus:border-blue-500 transition-colors mb-6"
                        disabled={showFeedback}
                    />

                    {/* Feedback */}
                    {showFeedback && (
                        <div className={`p-4 rounded-2xl mb-6 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            <p className="font-semibold text-center">
                                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </p>
                            {!isCorrect && (
                                <p className="text-center mt-2">Correct answer: {question.answer}</p>
                            )}
                        </div>
                    )}

                    {/* Action Button */}
                    {!showFeedback ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={!userAnswer.trim()}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Check Answer
                        </button>
                    ) : (
                        currentQuestion < lesson.totalQuestions - 1 ? (
                            <button
                                onClick={handleNext}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow"
                            >
                                Next Question
                            </button>
                        ) : (
                            <Link href={`/lesson-complete/${lessonId}`}>
                                <a>
                                    <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-shadow">
                                        Finish
                                    </button>
                                </a>
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* Floating Help Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow">
                <HelpCircle className="w-6 h-6 text-white" />
            </button>
        </div>
    )
}