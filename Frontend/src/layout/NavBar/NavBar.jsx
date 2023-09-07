import { useState } from 'react';
import '../Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import profile from '../../assets/profile.jpg'
import Dropdown from 'react-bootstrap/Dropdown';



export default function Navbar() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <nav>
      <div className={`sidebar-button ${sidebarActive ? 'active' : ''}`}>
        <Unicons.UilBars className={`sidebarBtn ${sidebarActive ? 'active' : ''}`} onClick={toggleSidebar} />
        <span className="dashboard">Dashboard</span>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <Unicons.UilSearch className="bx-search icon" />
      </div>
      <div className="profile-details">
        <img src={profile} alt="" />
        <span className="admin_name">Prem Shahi</span>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}
