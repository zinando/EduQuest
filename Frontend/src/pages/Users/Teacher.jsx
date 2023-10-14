import { useState, useEffect } from 'react';
import Item from '../../component/Item/TeacherItem';
import MultiSelectDropdown from '../../component/Multiselect/Multiselect';
import '../../component/Multiselect/multiselectdropdown.scss';
import '../../layout/Sidebar/SideBar.css';
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import {Col, Row, Modal } from 'react-bootstrap';
import Login from '../../pages/Login/Login';
import queryBackEnd, { userInfo, checkUserPermission, logOutUser } from '../queryBackEnd';
import fetchDashboardData from '../fetchResources';
import useIdle from '../../pages/useIdleTimer'
import Container from 'react-bootstrap/Container';
import Timetable from '../../component/Timetable/Timetable';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserStatsPieChart from '../../component/Chart/Chart';
import '../Dashboard/Home.css';
import triggerProcessing from '../triggerProcessing';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export default function Teacher() {
  //define state variables and initialize them
  const [date, setDate] = useState(new Date());

  //update class state and subject state upon page load
  useEffect(() => {
        checkUserPermission('SET_QUESTIONS');

  },[]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // check if user is idle and logout user
  const { isIdle } = useIdle({ onIdle: logOutUser, idleTime: 30 });

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <Container>

            <Row style={{height: '390px', marginBottom: '10px'}}>

              <Col xs={5}>
                <div className='calendar-container' style={{height: '300px'}}>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className='border-0 shadow rounded-0 p-4'
                  />
                </div>
                </Col>

              <Col xs={7} >
                <div className='border-0 shadow rounded-0 p-4 ' style={{ height: '300px', overflowY: 'scroll' }}>
                  <Timetable/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className='pt-4' style={{ height: '500px', overflowY: 'scroll' }}>
                 <Item/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  )
}

