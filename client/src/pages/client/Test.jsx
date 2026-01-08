import { Link, useRoute, useLocation } from 'wouter'
import { ArrowLeft, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { getQuestionsByTestId, saveUserTestResult } from '../../services/testService'

export default function Test() {
    const [, params] = useRoute('/test/:id')
    const [, setLocation] = useLocation()
    const testId = params?.id

    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            const res = await getQuestionsByTestId(testId)
            setQuestions(res.data)
        } catch (err) {
            console.error('Failed to load questions', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-gray-500">Loading test...</span>
            </div>
        )
    }

    if (!questions.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Test not found</h1>
                    <Link href="/courses">
                        <a className="text-blue-500 hover:text-blue-600">Back to Courses</a>
                    </Link>
                </div>
            </div>
        )
    }

    const question = questions[currentQuestion]
    const correctOption = question.answerOptions.find(opt => opt.correctAnswer === "1")
    const isCorrect = selectedAnswer === correctOption?.answerId
    const progress = ((currentQuestion + 1) / questions.length) * 100

    const handleSelectAnswer = (answerId) => {
        if (!showResult) {
            setSelectedAnswer(answerId)
        }
    }

    const handleCheckAnswer = () => {
        setShowResult(true)
    }

    const handleNextQuestion = async () => {
        let newScore = score
        if (isCorrect) {
            newScore += Number(question.score)
        }

        if (currentQuestion < questions.length - 1) {
            setScore(newScore)
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            // LƯU KẾT QUẢ
            await saveUserTestResult({
                score: newScore,
                status: 1,
                testId: Number(testId),
                answerAttachments: ""
            })

            setLocation(
                `/test-result/${testId}?score=${newScore}&total=${questions.length}`
            )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Back */}
                <Link href="/courses">
                    <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Courses
                    </a>
                </Link>

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-1">
                            English Grammar Test
                        </h1>
                        <p className="text-gray-600">
                            Test ID: {testId}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-500">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Unlimited</span>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm text-cyan-500 font-semibold">
                            Question {currentQuestion + 1} / {questions.length}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <h2 className="text-2xl font-medium text-gray-900 text-center mb-8">
                        {question.content}
                    </h2>

                    <div className="space-y-4 mb-8">
                        {question.answerOptions.map((opt) => (
                            <button
                                key={opt.answerId}
                                disabled={showResult}
                                onClick={() => handleSelectAnswer(opt.answerId)}
                                className={`w-full p-6 rounded-2xl text-left transition-all
                                    ${selectedAnswer === opt.answerId
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-gray-50 hover:bg-gray-100'}
                                `}
                            >
                                <span className="text-lg">{opt.content}</span>
                            </button>
                        ))}
                    </div>

                    {showResult && (
                        <div className={`p-6 rounded-2xl mb-6 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                            <p className="text-center font-semibold text-lg">
                                {isCorrect ? 'Correct!' : 'Incorrect'}
                            </p>
                            {!isCorrect && (
                                <p className="text-center text-sm mt-2">
                                    Correct answer: <strong>{correctOption?.content}</strong>
                                </p>
                            )}
                        </div>
                    )}

                    {!showResult ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={!selectedAnswer}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold disabled:opacity-50"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold"
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
