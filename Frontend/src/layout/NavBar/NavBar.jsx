import { useState, useEffect } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import profile from '../../assets/profile.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { userInfo } from '../../pages/queryBackEnd';
import Sidebar from '../Sidebar/SideBar';


export default function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const user = userInfo();
    if (user && user.firstName) {
      setUserFirstName(user.firstName);
    }
  }, []);

  return (
    <nav>
      <div className={`sidebar-button ${sidebarVisible ? 'active' : ''}`}>
        <Unicons.UilBars
          className={`sidebarBtn ${sidebarVisible ? 'active' : ''}`}
          onClick={toggleSidebar}
        />
      </div>
      <Sidebar isVisible={sidebarVisible} />
        <>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <Unicons.UilSearch className="bx-search icon" />
          </div>
          <Dropdown className='profile-details'>
            <span className="admin_name">Hi, {userFirstName}</span>
            <img src={profile} alt="" />
            <Dropdown.Toggle as="span" id="dropdown-custom-components">
              <i className="fa fa-caret-down"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
    </nav>
  );
}
