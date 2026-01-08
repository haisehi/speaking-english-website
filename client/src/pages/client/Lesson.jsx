import { Link, useRoute, useLocation } from 'wouter'
import { HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import {
    getVocabulariesByLessonId,
    startOrUpdateLesson
} from '../../services/vocabularyService'

export default function Lesson() {
    const [, params] = useRoute('/lesson/:id')
    const [, setLocation] = useLocation()
    const lessonId = Number(params?.id)

    const [vocabularies, setVocabularies] = useState([])
    const [questionModes, setQuestionModes] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswer, setUserAnswer] = useState('')
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const [correctCount, setCorrectCount] = useState(0)


    useEffect(() => {
        fetchVocabularies()
    }, [])

    const fetchVocabularies = async () => {
        try {
            const res = await getVocabulariesByLessonId(lessonId)
            setVocabularies(res.data)

            //  random mode cho mỗi câu
            const modes = res.data.map(() =>
                Math.random() < 0.5 ? 'typing' : 'choice'
            )
            setQuestionModes(modes)
        } catch (err) {
            console.error('Failed to load vocabularies', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-gray-500">Loading lesson...</span>
            </div>
        )
    }

    if (!vocabularies.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Lesson not found
                    </h1>
                    <Link href="/courses">
                        <a className="text-blue-500 hover:text-blue-600">
                            Back to Courses
                        </a>
                    </Link>
                </div>
            </div>
        )
    }

    const totalQuestions = vocabularies.length
    const question = vocabularies[currentQuestion]
    const mode = questionModes[currentQuestion]
    const progress = ((currentQuestion + 1) / totalQuestions) * 100

    //  KHÔNG DÙNG useMemo — tính trực tiếp
    let choices = []
    if (mode === 'choice') {
        const correct = question.meaning
        const wrongs = vocabularies
            .filter(v => v.vocabId !== question.vocabId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(v => v.meaning)

        choices = [...wrongs, correct].sort(() => 0.5 - Math.random())
    }

    const handleCheckAnswer = () => {
        let correct = false

        if (mode === 'typing') {
            correct =
                userAnswer.toLowerCase().trim() ===
                question.meaning.toLowerCase().trim()
        }

        if (mode === 'choice') {
            correct = selectedChoice === question.meaning
        }

        if (correct) {
    setCorrectCount(prev => prev + 1)
}


        setIsCorrect(correct)
        setShowFeedback(true)
    }

    const handleNext = async () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1)
            setUserAnswer('')
            setSelectedChoice(null)
            setShowFeedback(false)
        } else {
            try {
                await startOrUpdateLesson({
                    courseId: question.lessonId,
                    lessonId,
                    progress: 100.0
                })
            } catch (err) {
                console.error('Failed to save lesson progress', err)
            }

            setLocation(
  `/lesson-complete/${lessonId}?total=${totalQuestions}&correct=${correctCount}`
)

        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Progress
                        </span>
                        <span className="text-sm font-bold text-blue-500">
                            {currentQuestion + 1} / {totalQuestions}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-3xl shadow-xl p-12 mb-6">
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                            {mode === 'typing'
                                ? 'Type the Answer'
                                : 'Choose the Correct Answer'}
                        </span>

                        <h1 className="text-6xl font-medium text-blue-500 mb-6">
                            {question.word}
                        </h1>
                        <p className="text-lg text-gray-600">
                            What does this word mean?
                        </p>
                    </div>

                    {mode === 'typing' && (
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            disabled={showFeedback}
                            placeholder="Type the meaning..."
                            className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl text-center text-lg mb-6"
                        />
                    )}

                    {mode === 'choice' && (
                        <div className="space-y-4 mb-6">
                            {choices.map((c, i) => (
                                <button
                                    key={i}
                                    disabled={showFeedback}
                                    onClick={() => setSelectedChoice(c)}
                                    className={`w-full p-4 rounded-2xl text-left ${
                                        selectedChoice === c
                                            ? 'bg-blue-100 border-2 border-blue-500'
                                            : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    {showFeedback && (
                        <div
                            className={`p-4 rounded-2xl mb-6 ${
                                isCorrect
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            <p className="font-semibold text-center">
                                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </p>
                            {!isCorrect && (
                                <p className="text-center mt-2">
                                    Correct answer: {question.meaning}
                                </p>
                            )}
                        </div>
                    )}

                    {!showFeedback ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={
                                mode === 'typing'
                                    ? !userAnswer.trim()
                                    : !selectedChoice
                            }
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold"
                        >
                            {currentQuestion < totalQuestions - 1
                                ? 'Next Question'
                                : 'Finish'}
                        </button>
                    )}
                </div>
            </div>

            <button className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 rounded-full shadow-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
            </button>
        </div>
    )
}
