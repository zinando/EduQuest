import './SideBar.css'
import { Link } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';


export default function SideBar() {
  return (

    <>
      <div className="sidebar">
        <div className='logo'>
          <Link to="/SignUp" className='logo'><h2>E<span className='quest'>Q</span><span className='yellow'>.</span></h2></Link>
        </div>
        <ul>
          <li>
            <Link to="/Home" className='active'><Unicons.UilCreateDashboard className="icon" />Dashboard</Link>
          </li>
          <li>
            <Link to="/schedule"><Unicons.UilSchedule className="icon" />Schedule</Link>
          </li>
          <li>
            <Link to="/subject"><Unicons.UilBooks className="icon" />Subjects</Link>
          </li>
          <li>
            <Link to="/Exam"><Unicons.UilFile className="icon" />Exam</Link>
          </li>
          <li>
            <Link to="/Message"><Unicons.UilCommentsAlt className="icon" />Message</Link>
          </li>
          <li>
            <Link to="/Settings"><Unicons.UilSetting className="icon" />Settings</Link>
          </li>

        </ul>
      </div>
    </>



  )
}