import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import Header from '../../components/Header'
import { Mic } from 'lucide-react'
import { getSpeakingTopics } from '../../services/speakingService'

export default function SpeakingTopics() {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getSpeakingTopics().then(res => setTopics(res.data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <Mic className="w-7 h-7 text-orange-500" />
                    Speaking Topics
                </h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {topics.map(topic => (
                        <Link key={topic.id} href={`/speaking/topic/${topic.id}`}>
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer">
                                <h2 className="text-xl font-semibold mb-2">
                                    {topic.title}
                                </h2>
                                <p className="text-gray-600">
                                    {topic.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
