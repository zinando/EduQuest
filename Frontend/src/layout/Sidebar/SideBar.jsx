import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser, checkUserPermission } from '../../pages/queryBackEnd'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Group 1.png'
import { DashboardOutlined, PeopleAltOutlined, CalendarMonthOutlined, LocalLibraryOutlined, SupportAgentOutlined, SettingsOutlined, LogoutOutlined } from '@mui/icons-material';



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
            <NavLink to="/Home" >
              <DashboardOutlined className='icon' />
              <span className="links_name">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <PeopleAltOutlined className='icon' />
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
              <CalendarMonthOutlined className='icon' />
              <span className="links_name">Schedule</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/exam_landing">
              <LocalLibraryOutlined className='icon' />
              <span className="links_name">Exam</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Support">
              <SupportAgentOutlined className='icon' />
              <span className="links_name">Results</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Subject">
              <SettingsOutlined className='icon' />
              <span className="links_name">Settings</span>
            </NavLink>
          </li>
          <li className="log_out">
            <div  onClick={logOutUser} style={{ color: '#ffffff', cursor: 'pointer' }}>
              <LogoutOutlined className='icon' />
              <span className="links_name">Log out</span>
            </div>
          </li>
        </ul>
      </div>
    </>

  )
}







