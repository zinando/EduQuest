import SignUp from './pages/Signup/SignUp'
import Login from './pages/Login/Login'
import Forgot from './pages/Login/Forgot'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



export default function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </Router>
        
    </>
  )
}

