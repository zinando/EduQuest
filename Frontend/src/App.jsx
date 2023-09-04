import SignUp from './pages/Signup/SignUp'
import Login from './pages/Login/Login'
import Forgot from './pages/Login/Forgot'
import Error from './pages/Login/error'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './layout/Sidebar/SideBar'
import Home from './pages/Dashboard/Home'
import Schedule from './pages/Schedule/Schedule'
import Subject from './pages/Subject/Subject'


export default function App() {


  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/error" element={< Error />} />
            <Route path="/sidebar" element={< SideBar />} />
            <Route path="/home" element={< Home />} />
            <Route path="/schedule" element={< Schedule />} />
            <Route path="/subject" element={< Subject />} />
          </Routes>
        </Router>





      </div>
    </>
  )
}

