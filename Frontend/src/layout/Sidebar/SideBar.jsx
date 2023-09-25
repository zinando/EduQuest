import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser, checkUserPermission } from '../../pages/queryBackEnd'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Group 1.png'





export default function SideBar({ isVisible }) {
  return (
    <>
      <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
        <div className="logo-details">
          <Link to="/Login" className="logo">
            <img src={logo} alt="eduquest log" className="small-image" />
          </Link>
        </div>


        <ul className={`nav-links ${isVisible ? 'visible' : ''}`}>
          <li>
            <NavLink to="/Home" className="active-link">
              <Unicons.UilWindowGrid className='icon' />
              <span className="links_name">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <Unicons.UilUsersAlt className='icon' />
              <NavDropdown id="nav-dropdown" title={<span className="nav-dropdown-title">Admin</span>}>
                <NavDropdown.Item as={Link} to="/Users" eventKey="4.1">
                  Manage users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Classes" eventKey="4.2">
                  Manage classes
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Subjects" eventKey="4.3">
                  Manage subjects
                </NavDropdown.Item>
              </NavDropdown>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Schedule">
              <Unicons.UilSchedule className='icon' />
              <span className="links_name">Schedule</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Exam">
              <Unicons.UilBookOpen className='icon' />
              <span className="links_name">Exam</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Support">
              <Unicons.UilCommentQuestion className='icon' />
              <span className="links_name">Support</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Subject">
              <Unicons.UilSetting className='icon' />
              <span className="links_name">Settings</span>
            </NavLink>
          </li>
          <li className="log_out">
            <div className="btn" onClick={logOutUser} style={{ color: '#ffffff', cursor: 'pointer' }}>
              <Unicons.UilSignout className='icon' />
              <span className="links_name">Log out</span>
            </div>
          </li>
        </ul>
      </div>
    </>

  )
}







