import { Switch, Route } from "wouter"
import Home from "./pages/client/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CourseDetail from "./pages/client/CourseDetail"
import Lesson from "./pages/client/Lesson"
import LessonComplete from "./pages/client/LessonComplete"
import AllCourses from "./pages/client/AllCourses"
import Test from "./pages/client/Test"
import TestResult from "./pages/client/TestResult"
import Translate from "./pages/client/Translate"
import Profile from "./pages/client/Profile"
import Homee from "./pages/client/Homee"
import SpeakingTopics from "./pages/client/SpeakingTopics"
import SpeakingLessons from "./pages/client/SpeakingLessons"
import SpeakingPractice from "./pages/client/SpeakingPractice"


function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Homee} />
      <Route path="/courses" component={AllCourses} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/lesson/:id" component={Lesson} />
      <Route path="/lesson-complete/:id" component={LessonComplete} />
      <Route path="/test/:id" component={Test} />
      <Route path="/test-result/:id" component={TestResult} />
      <Route path="/translate" component={Translate} />
      <Route path="/profile" component={Profile} />
      <Route path="/speaking" component={SpeakingTopics} />
      <Route path="/speaking/topic/:id" component={SpeakingLessons} />
      <Route path="/speaking/lesson/:id" component={SpeakingPractice} />

    </Switch>
  )
}

export default App