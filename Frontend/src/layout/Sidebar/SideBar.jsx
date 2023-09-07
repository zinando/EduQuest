import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';



export default function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <Link to="/Signup" className='mb-3 logo'><h2 className='logo'>Edu<span>Quest</span></h2></Link>
        </div>
        <ul className="nav-links">
          <li>

            <Link to="/Home" className="active">
              <Unicons.UilWindowGrid className='icon' />
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>

            <Link to="/Schedule">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Schedule</span>
            </Link>
          </li>
          <li>
            <Link to="/Subject">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Subject</span>
            </Link>
          </li>
          <li>
            <Link to="/Exam">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Exam</span>
            </Link>
          </li>

          <li>
            <Link to="/Subject">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Support</span>
            </Link>
          </li>
          <li>
            <Link to="/Subject">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Settings</span>
            </Link>
          </li>
          <li className="log_out">
            <Link to="/Login">
              <Unicons.UilSignout className='icon' />
              <span className="links_name">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </>

  )
}