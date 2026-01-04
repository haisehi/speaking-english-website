import { Link, useRoute, useLocation } from 'wouter'
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, ArrowLeft, Clock } from 'lucide-react'
import { useState } from 'react'
import Header from '../../components/Header'

const testData = {
    1: {
        title: 'Basic Grammar Test 1',
        subtitle: 'Basic English Grammar - Test 1',
        duration: '60 mins',
        totalQuestions: 3,
        questions: [
            {
                id: 1,
                question: 'What is the correct form of the verb "to be" in the present tense for "I"?',
                options: [
                    { id: 'A', text: 'am' },
                    { id: 'B', text: 'is' },
                    { id: 'C', text: 'are' }
                ],
                correctAnswer: 'A',
                points: 10
            },
            {
                id: 2,
                question: 'Which article is correct: "___ apple a day keeps the doctor away"?',
                options: [
                    { id: 'A', text: 'A' },
                    { id: 'B', text: 'An' },
                    { id: 'C', text: 'The' }
                ],
                correctAnswer: 'B',
                points: 10
            },
            {
                id: 3,
                question: 'Choose the correct article: "I saw ___ elephant at the zoo."',
                options: [
                    { id: 'A', text: 'a' },
                    { id: 'B', text: 'an' },
                    { id: 'C', text: 'the' }
                ],
                correctAnswer: 'B',
                points: 10
            }
        ]
    },
    2: {
        title: 'Basic Grammar Test 2',
        subtitle: 'Basic English Grammar - Test 2',
        duration: '90 mins',
        totalQuestions: 3,
        questions: [
            {
                id: 1,
                question: 'Select the correct pronoun: "___ is my friend."',
                options: [
                    { id: 'A', text: 'He' },
                    { id: 'B', text: 'Him' },
                    { id: 'C', text: 'His' }
                ],
                correctAnswer: 'A',
                points: 10
            },
            {
                id: 2,
                question: 'Choose the correct verb: "They ___ to school every day."',
                options: [
                    { id: 'A', text: 'goes' },
                    { id: 'B', text: 'go' },
                    { id: 'C', text: 'going' }
                ],
                correctAnswer: 'B',
                points: 10
            },
            {
                id: 3,
                question: 'What is the plural of "child"?',
                options: [
                    { id: 'A', text: 'childs' },
                    { id: 'B', text: 'childes' },
                    { id: 'C', text: 'children' }
                ],
                correctAnswer: 'C',
                points: 10
            }
        ]
    },
    3: {
        title: 'Intermediate Grammar Test 1',
        subtitle: 'Intermediate English Grammar - Test 1',
        duration: '75 mins',
        totalQuestions: 3,
        questions: [
            {
                id: 1,
                question: 'Choose the correct tense: "I ___ to Paris last year."',
                options: [
                    { id: 'A', text: 'go' },
                    { id: 'B', text: 'went' },
                    { id: 'C', text: 'gone' }
                ],
                correctAnswer: 'B',
                points: 10
            },
            {
                id: 2,
                question: 'Select the correct form: "She has ___ her homework."',
                options: [
                    { id: 'A', text: 'finish' },
                    { id: 'B', text: 'finished' },
                    { id: 'C', text: 'finishing' }
                ],
                correctAnswer: 'B',
                points: 10
            },
            {
                id: 3,
                question: 'Which is correct: "If I ___ you, I would accept the offer."',
                options: [
                    { id: 'A', text: 'am' },
                    { id: 'B', text: 'was' },
                    { id: 'C', text: 'were' }
                ],
                correctAnswer: 'C',
                points: 10
            }
        ]
    },
    4: {
        title: 'Advanced Grammar Test 1',
        subtitle: 'Advanced English Grammar - Test 1',
        duration: '120 mins',
        totalQuestions: 3,
        questions: [
            {
                id: 1,
                question: 'Choose the correct subjunctive: "It is essential that he ___ on time."',
                options: [
                    { id: 'A', text: 'arrives' },
                    { id: 'B', text: 'arrive' },
                    { id: 'C', text: 'arrived' }
                ],
                correctAnswer: 'B',
                points: 10
            },
            {
                id: 2,
                question: 'Select the correct form: "Having ___ the book, she returned it to the library."',
                options: [
                    { id: 'A', text: 'read' },
                    { id: 'B', text: 'reading' },
                    { id: 'C', text: 'to read' }
                ],
                correctAnswer: 'A',
                points: 10
            },
            {
                id: 3,
                question: 'Which is correct: "Scarcely ___ arrived when the phone rang."',
                options: [
                    { id: 'A', text: 'I had' },
                    { id: 'B', text: 'had I' },
                    { id: 'C', text: 'I have' }
                ],
                correctAnswer: 'B',
                points: 10
            }
        ]
    }
}

export default function Test() {
    const [, params] = useRoute('/test/:id')
    const [, setLocation] = useLocation()
    const testId = params?.id
    const test = testData[testId]

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    if (!test) {
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

    const question = test.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / test.totalQuestions) * 100
    const isCorrect = selectedAnswer === question.correctAnswer

    const handleSelectAnswer = (optionId) => {
        if (!showResult) {
            setSelectedAnswer(optionId)
        }
    }

    const handleNextQuestion = () => {
        // Tính điểm của câu hiện tại TRƯỚC KHI chuyển sang câu tiếp
        let newScore = score
        if (selectedAnswer === question.correctAnswer) {
            newScore = score + question.points
        }

        if (currentQuestion < test.totalQuestions - 1) {
            // Chưa phải câu cuối -> chuyển sang câu tiếp
            setScore(newScore)
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            // Câu cuối -> tính kết quả và chuyển trang
            const finalScore = newScore
            const correctAnswers = Math.round(finalScore / 10)

            // Redirect to result page
            setLocation(`/test-result/${testId}?score=${finalScore}&total=${test.totalQuestions}&correct=${correctAnswers}`)
        }
    }

    const handleCheckAnswer = () => {
        setShowResult(true)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
<Header/>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Back Button */}
                <Link href="/courses">
                    <a className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Courses</span>
                    </a>
                </Link>

                {/* Test Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-1">{test.title}</h1>
                        <p className="text-gray-600">{test.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-500">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{test.duration}</span>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Progress</span>
                        <span className="text-sm text-cyan-500 font-semibold">Question {currentQuestion + 1} of {test.totalQuestions}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    {/* Question Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            Question {currentQuestion + 1}
                        </span>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-2xl font-medium text-gray-900 text-center mb-8">
                        {question.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-4 mb-8">
                        {question.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelectAnswer(option.id)}
                                disabled={showResult}
                                className={`w-full p-6 rounded-2xl text-left transition-all ${selectedAnswer === option.id
                                        ? 'bg-blue-100 border-2 border-blue-500'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${selectedAnswer === option.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {option.id}
                                    </div>
                                    <span className="text-lg text-gray-900">{option.text}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Result Feedback */}
                    {showResult && (
                        <div className="mb-6">
                            <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    {isCorrect ? (
                                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                    <span className={`text-2xl font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {isCorrect ? 'Correct!' : 'Incorrect'}
                                    </span>
                                </div>
                            </div>

                            {!isCorrect && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-blue-700">Correct answer:</span>{' '}
                                        {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">Score: {question.points} points</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Button */}
                    {!showResult ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={!selectedAnswer}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-shadow"
                        >
                            {currentQuestion < test.totalQuestions - 1 ? 'Next Question' : 'Finish Test'}
                        </button>
                    )}
                </div>
            </div>

            {/* Floating Help Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}