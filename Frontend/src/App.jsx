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
import Users from './pages/Admin/Users'
import Classes from './pages/Admin/classes';
import Subjects from './pages/Admin/Subjects'
import Support from './pages/Support/Support';





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
            <Route path="/exam" element={< Exam />} />
            <Route path="/Users" element={< Users />} />
            <Route path="/classes" element={< Classes />} />
            <Route path="/subjects" element={< Subjects />} />
            <Route path="/support" element={< Support />} />

          </Routes>
        </Router>
      </div>
    </>
  )
}

