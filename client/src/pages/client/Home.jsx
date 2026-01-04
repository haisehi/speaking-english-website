import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import LearnAnywhere from '../../components/LearnAnywhere'
import WhyChooseUs from '../../components/WhyChooseUs'
import Testimonials from '../../components/Testimonials'
import Footer from '../../components/Footer'

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <Features />
            <LearnAnywhere />
            <WhyChooseUs />
            <Testimonials />
            <Footer />
        </div>
    )
}