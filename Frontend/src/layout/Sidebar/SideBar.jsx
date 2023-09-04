import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <>
      <nav>
        <ul>
          <li className="logo">
            <Link to="/Signup" className='mb-3 logo'><h2 className='logo'>Edu<span>Quest</span></h2></Link>
          </li>
          <div className='links'>
            <li>
              <Link to="/Home" className='active nav-link'>
                <Unicons.UilCreateDashboard className="icon" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/Schedule" className='nav-link'>
                <Unicons.UilSchedule className="icon" />
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/Subject" className='nav-link'>
                <Unicons.UilBooks className="icon" />
                Subjects
              </Link>
            </li>
            <li>
              <Link to="/Exam" className='nav-link'>
                <Unicons.UilFile className="icon" />
                Exam
              </Link>
            </li>
            <li>
              <Link to="/Support" className='nav-link'>
                <Unicons.UilCommentsAlt className="icon" />
                Support
              </Link>
            </li>
            <li>
              <Link to="/Settings" className='nav-link'>
                <Unicons.UilSetting className="icon" />
                Settings
              </Link>
            </li>
            
          </div>
        </ul>
        
      </nav>
      
      <div className="wrapper">
        <div className="section">
          <div className="box-area"></div>
        </div>
      </div>


     
     
     
    </>
  )
}
