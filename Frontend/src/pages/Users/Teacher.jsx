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
  const [userStat, setUserStat] = useState({teachers: 0, students: 0, reviewers: 0});
  const [date, setDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [examTitle, setExamTitle] = useState('');
  const [examType, setExamType] = useState(null);
  const [examClasses, setExamClasses] = useState([]);
  const [excludedSubjects, setExcludedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  //update class state and subject state upon page load
  useEffect(() => {
        checkUserPermission('SET_QUESTIONS');
        //fetchDashboardData(userInfo().adminType);
        //const myStat = JSON.parse(sessionStorage.getItem('userStat'));
        //setUserStat(myStat);

  },[]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // check for token and user permission
  checkUserPermission('SUPER_DASHBOARD');

  //change minimum endDate when user selects startDate so endDate is not below startDate
  const handleNewStartDate = (newDate) => {
        setStartDate(newDate);
        setEndDate(newDate);
  };

//set selected options from the multiselectdropdowns
   const toggleClassOption = ({ id }) => {
        setSelectedClasses(prevSelectedClasses => {
            // if it's in, remove
            const newArray = [...prevSelectedClasses]
            if (newArray.includes(id)) {
                return newArray.filter(item => item != id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        })
   };

   const toggleSubjectOption = ({ id }) => {
        setSelectedSubjects(prevSelectedSubjects => {
            // if it's in, remove
            const newArray = [...prevSelectedSubjects]
            if (newArray.includes(id)) {
                return newArray.filter(item => item != id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        })
   };



  const handleShowAddModal = () => {
    const myClasses = JSON.parse(sessionStorage.getItem('klass'));
    const mySubjects = JSON.parse(sessionStorage.getItem('subjects'));
    setSubjects(mySubjects);
    setClasses(myClasses);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setSelectedSubjects([]);
    setSelectedClasses([]);
    setExamTitle('');
    setExamType(null);
    setStartDate(new Date());
    setShowAddModal(false);
  };

//retrieve and process form inputs, then queryBackEnd
  const addExamHandler = () => {
    const data = {};
    data.exam_title = examTitle;
    data.exam_type = examType;
    data.start_date = startDate.toLocaleDateString('en-GB');
    data.end_date = endDate.toLocaleDateString('en-GB');
    data.classes = selectedClasses;
    data.subjects = selectedSubjects;

    if (data.exam_title && data.start_date && data.classes){
         // query queryBackEnd
        const url = '/dashboard/SUPER';
        const action = 'CREATE-EXAM';

        queryBackEnd(url, data, action)
        .then((response) => {
            if (response.status === 1){
                //fetch resources, refresh page
                fetchDashboardData('super');
                location.reload();
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: response.message,
                });
                console.log(response.error);
            }
        });


    } else {
        Swal.fire({
            title: 'Empty Fields',
            icon: "error",
            text: "Some important fields are empty",
        })
    }

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
              {/*
              <Col xs={2}>
                <div className=" border-0 shadow rounded-0 p-4 time" style={{height: '300px'}}>
                  <h4 className="custom-heading">User Stats</h4>
                  <ul className="card-text" style={{ listStyle: 'none', padding: 10 }}>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="teachers"><Unicons.UilUsersAlt color="#0B88B3" size="25" /></span>
                      <span style={{ marginLeft: '10px' }}>{userStat.teachers}</span>
                    </li><br/>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="students"><Unicons.UilGraduationCap color="#0B88B3" size="25" /></span>
                      <span style={{ marginLeft: '10px' }}>{userStat.students}</span>
                    </li><br/>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="reviewers"><Unicons.UilFilesLandscapes color="#0B88B3" size="25" /></span>
                       <span style={{ marginLeft: '10px' }}>{userStat.reviewers}</span>
                    </li>
                  </ul>
                </div>
              </Col> */}
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

