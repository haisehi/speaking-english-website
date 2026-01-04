import { Switch, Route } from "wouter"
import Home from "./Home"
import Homee from "./Homee"
import CourseDetail from "./CourseDetail"
import Lesson from "./Lesson"
import LessonComplete from "./LessonComplete"
import AllCourses from "./AllCourses"
import Test from "./Test"
import TestResult from "./TestResult"
import Translate from "./Translate"
import Profile from "./Profile"
import Login from "../Login"
import Register from "../Register"

export default function ClientRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Homee} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/courses" component={AllCourses} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/lesson/:id" component={Lesson} />
      <Route path="/lesson-complete/:id" component={LessonComplete} />
      <Route path="/test/:id" component={Test} />
      <Route path="/test-result/:id" component={TestResult} />
      <Route path="/translate" component={Translate} />
      <Route path="/profile" component={Profile} />

      {/* fallback */}
      <Route>
        <div className="p-10">404 Client</div>
      </Route>
    </Switch>
  )
}
