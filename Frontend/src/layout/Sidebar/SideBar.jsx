import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser, checkUserPermission } from '../../pages/queryBackEnd'


export default function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <Link to="/SignUp" className='mb-3 logo'><h2 className='logo ques'>Edu<span className='quest'>Quest</span></h2></Link>
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
              <NavDropdown id="nav-dropdown" title={<span className="nav-dropdown-title">Admin</span>}>

                <NavDropdown.Item eventKey="4.1">Manage users</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">Manage classes</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">Manage subjects</NavDropdown.Item>
                
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
            <Link to="/Support">
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
            <div className="btn" onClick={logOutUser} style={{color: '#ffffff', cursor: 'pointer'}}>
              <Unicons.UilSignout className='icon' />
              <span className="links_name">Log out</span>
            </div>
          </li>
        </ul>
      </div>
    </>

  )
}