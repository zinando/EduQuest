import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import profile from '../../assets/user-1.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { userInfo } from '../../pages/queryBackEnd';
import Sidebar from '../Sidebar/SideBar';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';


export default function Navbar() {
  const [userFirstName, setUserFirstName] = useState('');


  useEffect(() => {
    const user = userInfo();
    if (user && user.firstName) {
      setUserFirstName(user.firstName);
    }
  }, []);

  return (
    <nav>
      <div>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              color="secondary" variant="dot">
              <NotificationsActiveOutlinedIcon />
              
            </Badge>
          </IconButton>
          
        </MenuItem>
      </div>
      <Sidebar/>
        <>
         
          <Dropdown className='profile-details'>
          <span className="admin_name">Hi, {userFirstName}</span>
          <Avatar alt="user" src={profile} />
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
