import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
            <Link to="/Exam">
              <Unicons.UilUsersAlt className='icon' />
              <span className="links_name">Admin</span>
              <NavDropdown id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Link>
          </li>
          <li>
            <Link to="/Schedule">
              <Unicons.UilSchedule className='icon' />
              <span className="links_name">Schedule</span>
            </Link>
          </li>
          
          <li>
            <Link to="/Subject">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Exam</span>
            </Link>
          </li>



          <li>
            <Link to="/Subject">
              <Unicons.UilCommentQuestion className='icon' />
              <span className="links_name">Support</span>
            </Link>
          </li>
          <li>
            <Link to="/Subject">
              <Unicons.UilSetting className='icon' />
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