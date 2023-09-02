import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';



export default function SideBar() {
  return (

    <>
      <nav>
        <ul>
          <li className="logo">
            <Link to="/SignUp" ><h2>E<span className='quest'>Q</span><span className='yellow'>.</span></h2></Link>
          </li>
          <li>
            <Link to="/Home" className='active'><Unicons.UilCreateDashboard className="icon" />Dashboard</Link>
          </li>
          <li>
            <Link to="/Schedule"><Unicons.UilSchedule className="icon" />Schedule</Link>
          </li>
          <li>
            <Link to="/subject"><Unicons.UilBooks className="icon" />Subjects</Link>
          </li>
          <li>
            <Link to="/Exam"><Unicons.UilFile className="icon" />Exam</Link>
          </li>
          <li>
            <Link to="/Support"><Unicons.UilCommentsAlt className="icon" />Support</Link>
          </li>
          <li>
            <Link to="/Settings"><Unicons.UilSetting className="icon" />Settings</Link>
          </li>
        </ul>
      </nav>
      <div className="wrapper">
        <div className="section">
          <div className="box-area">
            
            
          </div>
        </div>
      </div>
    </>




  )
}