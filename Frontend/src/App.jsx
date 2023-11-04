import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/Signup/SignUp'
import Login from './pages/Login/Login'
import Forgot from './pages/Login/Forgot'
import Error from './pages/Login/error'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './layout/Sidebar/SideBar'
import Home from './pages/Dashboard/Home'
import Schedule from './pages/Schedule/Schedule'
import Landing from '../LandingPage/Landing'
import Exam from './pages/Exam/Exam'
import ExamLandingPage from './pages/Exam/ExamLanding'
import Users from './pages/Admin/Users'
import Classes from './pages/Admin/classes';
import Subjects from './pages/Admin/Subjects'
import Teacher from './pages/Users/Teacher'
import Student from './pages/Users/Student'
import Reviewers from './pages/Users/Reviewer'
import SetExamQuestions from './pages/Questions/SetQuestions'
import ReviewExamQuestions from './pages/Questions/ReviewQuestions'
import ReviewExamResults from './pages/Questions/ReviewResults'
import Support from './pages/Support/Support';
import StudentReportCard from './pages/Result/StudentReportCard';
import ClassResultCard from './pages/Result/ClassResultCard';
import ResultLanding from './pages/Result/ResultLanding';





export default function App() {


  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/error" element={< Error />} />
            <Route path="/sidebar" element={< SideBar />} />
            <Route path="/home" element={< Home />} />
            <Route path="/schedule" element={< Schedule />} />
            <Route path="/exam_landing/exam" element={< Exam />} />
            <Route path="/exam_landing" element={< ExamLandingPage />} />
            <Route path="/Users" element={< Users />} />
            <Route path="/classes" element={< Classes />} />
            <Route path="/subjects" element={< Subjects />} />
            <Route path="/dashboard/student" element={< Student />} />
            <Route path="/dashboard/teacher" element={< Teacher />} />
            <Route path="/dashboard/reviewer" element={< Reviewers />} />
            <Route path="/set_question" element={<SetExamQuestions />} />
            <Route path="/support" element={< Support />} />
            <Route path="/review_question" element={< ReviewExamQuestions />} />
            <Route path="/review_result" element={< ReviewExamResults />} />
            <Route path="/report_card" element={< StudentReportCard />} />
            <Route path="/class_result" element={< ClassResultCard />} />
            <Route path="/class_result_landing" element={< ResultLanding />} />

          </Routes>
        </Router>
      </div>
    </>
  )
}

