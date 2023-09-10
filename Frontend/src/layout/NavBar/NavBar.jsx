import { useState } from 'react';
import '../Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import profile from '../../assets/profile.jpg'
import NavDropdown from 'react-bootstrap/NavDropdown';




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
        <NavDropdown  id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
}
