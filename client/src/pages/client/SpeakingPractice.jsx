import { useEffect, useRef, useState } from 'react'
import { useRoute, useLocation } from 'wouter'
import Header from '../../components/Header'
import {
    getSentencesByLesson,
    compareSpeakingSentence,
    submitSpeakingLesson
} from '../../services/speakingService'
import { Mic, MicOff } from 'lucide-react'
import Lottie from 'lottie-react'

//  Animations
import speak1 from '../../assets/animations2/speak1.json'
import speak2 from '../../assets/animations2/speak2.json'
import speak3 from '../../assets/animations2/speak3.json'
import speak4 from '../../assets/animations2/speak4.json'

export default function SpeakingPractice() {
    const [, params] = useRoute('/speaking/lesson/:id')
    const [, setLocation] = useLocation()
    const lessonId = Number(params.id)

    const [sentences, setSentences] = useState([])
    const [current, setCurrent] = useState(0)

    const [spokenText, setSpokenText] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [results, setResults] = useState([])

    const [submitResult, setSubmitResult] = useState(null)

    //  speech
    const [isListening, setIsListening] = useState(false)
    const recognitionRef = useRef(null)
    const listenTimeoutRef = useRef(null)

    //  FIX CORE BUG
    const hasResultRef = useRef(false)

    // mic error
    const [micError, setMicError] = useState('')

    // animation
    const animations = [speak1, speak2, speak3, speak4]
    const [currentAnimation, setCurrentAnimation] = useState(null)

    // fetch sentences
    useEffect(() => {
        getSentencesByLesson(lessonId).then(res => {
            const sorted = [...res.data].sort(
                (a, b) => a.orderIndex - b.orderIndex
            )
            setSentences(sorted)
        })
    }, [lessonId])

    // random animation mỗi câu
    useEffect(() => {
        if (!sentences.length) return
        const randomIndex = Math.floor(Math.random() * animations.length)
        setCurrentAnimation(animations[randomIndex])
    }, [current, sentences])

    // speech recognition setup
    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition

        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.lang = 'en-US'
        recognition.interimResults = false

        recognition.onresult = (e) => {
            const text = e.results[0][0].transcript

            hasResultRef.current = true // ✅ QUAN TRỌNG
            setSpokenText(text)
            setMicError('')
            clearTimeout(listenTimeoutRef.current)
        }

        recognition.onend = () => {
            setIsListening(false)

            //  KHÔNG dùng spokenText ở đây
            if (!hasResultRef.current) {
                setMicError('Không nghe thấy giọng nói, vui lòng thử lại 🎤')
            }
        }

        recognition.onerror = () => {
            setIsListening(false)
            setMicError('Microphone gặp sự cố, vui lòng thử lại')
        }

        recognitionRef.current = recognition
    }, [])

    const toggleListening = () => {
        if (!recognitionRef.current) return

        setSpokenText('')
        setFeedback(null)
        setMicError('')
        hasResultRef.current = false

        if (isListening) {
            recognitionRef.current.stop()
            clearTimeout(listenTimeoutRef.current)
        } else {
            recognitionRef.current.start()

            //  timeout 5s
            listenTimeoutRef.current = setTimeout(() => {
                if (!hasResultRef.current) {
                    recognitionRef.current.stop()
                    setMicError('Không nghe thấy giọng nói, vui lòng thử lại 🎤')
                }
            }, 5000)
        }

        setIsListening(!isListening)
    }

    const handleCompare = async () => {
        const sentence = sentences[current]

        const res = await compareSpeakingSentence({
            sentenceId: sentence.id,
            userText: spokenText
        })

        setFeedback(res.data)
        setResults(prev => [
            ...prev,
            { sentenceId: sentence.id, userText: spokenText }
        ])
    }

    const nextSentence = () => {
        setSpokenText('')
        setFeedback(null)
        setMicError('')
        setCurrent(prev => prev + 1)
    }

    const handleSubmit = async () => {
        const res = await submitSpeakingLesson({
            lessonId,
            results
        })
        setSubmitResult(res.data)
    }

    if (!sentences.length) return null
    const sentence = sentences[current]

    // highlight words
    const renderHighlighted = () => {
        if (!feedback) return null

        const expectedWords = feedback.expected
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(' ')

        const spokenWords = spokenText
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(' ')

        return (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {expectedWords.map((word, index) => {
                    const correct = spokenWords[index] === word
                    return (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-xl text-sm font-medium ${
                                correct
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-600'
                            }`}
                        >
                            {word}
                        </span>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-6">
                    Speaking Practice
                </h1>

                <div className="bg-white p-8 rounded-2xl shadow">
                    {/* Animation */}
                    {currentAnimation && (
                        <div className="flex justify-center mb-6">
                            <div className="w-48 h-48">
                                <Lottie animationData={currentAnimation} loop autoplay />
                            </div>
                        </div>
                    )}

                    <p className="text-sm text-gray-500 mb-2">
                        Sentence {sentence.orderIndex} / {sentences.length}
                    </p>

                    <p className="text-2xl font-semibold mb-6">
                        “{sentence.sentenceEn}”
                    </p>

                    <div className="flex justify-center mb-4">
                        <button
                            onClick={toggleListening}
                            className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                isListening
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : 'bg-blue-500 text-white'
                            }`}
                        >
                            {isListening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                        </button>
                    </div>

                    {micError && (
                        <p className="text-center text-red-500 font-medium mb-3">
                            {micError}
                        </p>
                    )}

                    {spokenText && (
                        <p className="text-center text-gray-600 mb-3">
                            You said: <b>{spokenText}</b>
                        </p>
                    )}

                    {!feedback && spokenText && (
                        <div className="text-center">
                            <button
                                onClick={handleCompare}
                                className="bg-orange-500 text-white px-8 py-3 rounded-xl"
                            >
                                Check
                            </button>
                        </div>
                    )}

                    {feedback && (
                        <>
                            <p
                                className={`mt-4 text-center font-semibold ${
                                    feedback.correct ? 'text-green-600' : 'text-red-500'
                                }`}
                            >
                                {feedback.feedback}
                            </p>

                            {renderHighlighted()}

                            <div className="text-center mt-6">
                                {current < sentences.length - 1 ? (
                                    <button
                                        onClick={nextSentence}
                                        className="bg-blue-500 text-white px-8 py-3 rounded-xl"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-500 text-white px-8 py-3 rounded-xl"
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {submitResult && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-8 w-[360px] text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Lesson Result
                        </h2>

                        <p className="mb-2">
                            Correct: <b>{submitResult.totalCorrect}</b> / {submitResult.totalSentences}
                        </p>
                        <p className="mb-2">
                            Score: <b>{submitResult.percent}%</b>
                        </p>

                        <p
                            className={`font-semibold mb-6 ${
                                submitResult.isPass ? 'text-green-600' : 'text-red-500'
                            }`}
                        >
                            {submitResult.isPass ? 'PASS 🎉' : 'TRY AGAIN'}
                        </p>

                        <button
                            onClick={() => setLocation('/home')}
                            className="bg-blue-500 text-white px-10 py-3 rounded-xl"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
