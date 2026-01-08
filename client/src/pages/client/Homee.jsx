import { Link, useLocation } from 'wouter';
import { Sparkles, Home as HomeIcon, Mic, BookOpen, Languages, ChevronLeft, ChevronRight, Flame, Check, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getLatestLesson, getAttendanceHistory, getAllCoursesByUser, enrollCourse } from '../../services/home.service';

const slides = [
    {
        title: 'Perfect Your Pronunciation',
        description: 'Real-time AI feedback for native-like speech',
        gradient: 'from-pink-400 via-purple-400 to-pink-300',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
    },
    {
        title: 'Master English Grammar',
        description: 'Learn the fundamentals with AI-powered lessons',
        gradient: 'from-cyan-400 via-blue-400 to-cyan-300',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop'
    },
    {
        title: 'Play & Learn',
        description: 'Gamified lessons that make learning fun',
        gradient: 'from-orange-400 via-red-400 to-orange-300',
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&h=400&fit=crop'
    }
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [latestLesson, setLatestLesson] = useState(null);
    const [streak, setStreak] = useState([]);
    const [courses, setCourses] = useState([]);
    const [, setLocation] = useLocation();

    const userId = Number(localStorage.getItem('id_user'))

    //state pagination
const [currentPage, setCurrentPage] = useState(1);
const coursesPerPage = 9;

// Tính toán courses hiển thị theo page
const indexOfLastCourse = currentPage * coursesPerPage;
const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

const totalPages = Math.ceil(courses.length / coursesPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(prev => prev - 1);
};

const [showEnrollDialog, setShowEnrollDialog] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);



    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchLatestLesson();
        fetchAttendance();
        fetchCourses();
    }, []);

    const fetchLatestLesson = async () => {
        try {
            const res = await getLatestLesson();
            setLatestLesson(res.data);
        } catch (err) {
            console.error("Error fetching latest lesson:", err);
        }
    };

    const fetchAttendance = async () => {
        try {
            const res = await getAttendanceHistory(userId);
            // Chuyển thành object theo ngày để hiển thị calendar mini
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const today = new Date();
            const streakDays = days.map((day, i) => {
                const date = new Date();
                date.setDate(today.getDate() - (6 - i)); // tuần này
                const found = res.data.find(d => new Date(d.attendance_date).toDateString() === date.toDateString());
                return { day, active: !!found };
            });
            setStreak(streakDays);
        } catch (err) {
            console.error("Error fetching attendance:", err);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await getAllCoursesByUser();
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

const handleClickCourse = (course) => {
  setSelectedCourse(course);
  setShowEnrollDialog(true);
};

const confirmEnroll = async () => {
  try {
    await enrollCourse(selectedCourse.courseId, 4512); // giả lập studentCode
    alert(`Enrolled in "${selectedCourse.courseName}" successfully!`);
  } catch (err) {
    console.error("Error enrolling course:", err);
    alert("Failed to enroll. Please try again.");
  } finally {
    setShowEnrollDialog(false);
    setSelectedCourse(null);
  }
};

const cancelEnroll = () => {
  setShowEnrollDialog(false);
  setSelectedCourse(null);
};


    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Slide */}
                <div className="relative mb-8">
                    <div className={`relative h-64 rounded-3xl bg-gradient-to-r ${slides[currentSlide].gradient} overflow-hidden shadow-xl`}>
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: `url(${slides[currentSlide].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div className="relative h-full flex items-center justify-center text-center">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-3">{slides[currentSlide].title}</h2>
                                <p className="text-white text-lg opacity-90">{slides[currentSlide].description}</p>
                            </div>
                        </div>
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-colors">
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm flex items-center justify-center transition-colors">
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {slides.map((_, index) => (
                                <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Latest Lesson */}
                {latestLesson && (
                    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Your Latest Lesson</p>
                                        <h3 className="text-xl font-bold text-gray-900">{latestLesson.lessonName}</h3>
                                        <p className="text-sm text-gray-600">{latestLesson.content}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">Level {latestLesson.level}</div>
                                </div>
                                <div className="mb-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-semibold text-gray-900">{latestLesson.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[calc(latestLesson.progress%)] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center gap-2">
                                    Continue Lesson
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Attendance Streak */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Flame className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Daily Streak</h3>
                                <p className="text-xs text-gray-500">Keep your learning streak alive!</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-500">{streak.filter(s => s.active).length} days</div>
                            <p className="text-xs text-gray-400">Current Streak</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        {streak.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-2">{item.day}</div>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-700 ${item.active ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md hover:rotate-[360deg] cursor-pointer' : 'bg-gray-100'}`}>
                                    {item.active ? <Check className="w-5 h-5 text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses */}
<div className="grid md:grid-cols-3 gap-6">
  {currentCourses.map(course => (
    <div key={course.courseId} onClick={() => handleClickCourse(course)} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
      <div className="relative h-40 overflow-hidden">
        <img src={course.image || 'https://tse1.mm.bing.net/th/id/OIP.zwAtHtUNLEsOEymW3SEUsgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'} alt={course.courseName} className="w-full h-full object-cover"/>
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-700">{course.courseCode}</div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">{course.courseName}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Available Seats</span>
          <span className="font-semibold text-gray-900">{course.maxQuantity}</span>
        </div>
      </div>
    </div>
  ))}
</div>
{/* Enroll Confirmation Dialog */}
{showEnrollDialog && selectedCourse && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
      <h3 className="text-xl font-bold mb-4">Enroll Course</h3>
      <p className="mb-6">Are you sure you want to enroll in <span className="font-semibold">{selectedCourse.courseName}</span>?</p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={confirmEnroll} 
          className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Yes
        </button>
        <button 
          onClick={cancelEnroll} 
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


{/* Pagination Buttons */}
<div className="flex justify-center items-center gap-4 mt-6">
  <button 
    onClick={handlePrevPage} 
    disabled={currentPage === 1}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
  >
    Previous
  </button>
  <span className="text-gray-700 font-semibold">{currentPage} / {totalPages}</span>
  <button 
    onClick={handleNextPage} 
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-40"
  >
    Next
  </button>
</div>

            </div>
        </div>
    )
}
