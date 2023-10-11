import { useState, useEffect } from 'react';
import Item from '../../component/Item/Item';
import MultiSelectDropdown from '../../component/Multiselect/Multiselect';
import '../../component/Multiselect/multiselectdropdown.scss';
import '../../layout/Sidebar/SideBar.css';
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Col, Row, Modal } from 'react-bootstrap';
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
import './Home.css';
import triggerProcessing from '../triggerProcessing';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Home() {
  //define state variables and initialize them
  const [userStat, setUserStat] = useState({ teachers: 0, students: 0, reviewers: 0 });
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
  const [examRecords, setExamRecords] = useState([{ id: 0, title: '', type: '', klasses: [], exclude: [] }]);

  //update class state and subject state upon page load
  useEffect(() => {
    if (userInfo().adminType != 'super') {
      location.href = '/dashboard/' + userInfo().adminType;
    }
    //fetch dashboard data from database
    const url = '/dashboard/' + userInfo().adminType;
    const action = 'FETCH-EXAM-INSTANCES';
    const data = {};
    const method = 'POST';
    let my_stat = userStat;
    let my_class = classes;
    let my_subject = subjects;
    let my_record = examRecords;

    queryBackEnd(url, data, action, method)
      .then((response) => {
        if (response.status === 1) {
          my_stat = response.user_stat;
          my_class = response.klass;
          my_subject = response.subjects;
          my_record = response.exams;
        }
        setUserStat(my_stat);
        setClasses(my_class);
        setSubjects(my_subject);
        setExamRecords(my_record);
      })
      .catch((error) => console.error(error));

  }, []);

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

    if (data.exam_title && data.start_date && data.classes) {
      // query queryBackEnd
      const url = '/dashboard/SUPER';
      const action = 'CREATE-EXAM';

      queryBackEnd(url, data, action)
        .then((response) => {
          if (response.status === 1) {
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

            <Row style={{ height: '390px', marginBottom: '10px' }}>

              <Col xs={4}>
                <div className='calendar-container' style={{ height: '300px' }}>
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className='border-0 shadow rounded-0 p-4'
                  />
                </div>
              </Col>

              <Col xs={6} >
                <div className='border-0 shadow rounded-0 p-4 ' style={{ height: '300px', overflowY: 'scroll' }}>
                  <Timetable />
                </div>
              </Col>
              <Col xs={2}>
                <div className="border-0 shadow rounded-0 p-4 time" style={{ height: '300px' }}>
                  <h4 className="custom-heading">User Stats</h4>
                  <ul className="custom-list">
                    <li className="custom-list-item"><Unicons.UilGraduationCap className="custom-icon" /> Teachers: {userStat.teachers}</li>
                    <li className="custom-list-item"><Unicons.UilBookReader className="custom-icon" /> Students: {userStat.students}</li>
                    <li className="custom-list-item"><Unicons.UilFilesLandscapes className="custom-icon" /> Reviewers: {userStat.reviewers}</li>
                  </ul>
                </div>


              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <div className='pt-4' style={{ height: '60px' }}>
                  <Button variant="secondary" onClick={handleShowAddModal}>
                    + Add New
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className='pt-4' style={{ height: '500px', overflowY: 'scroll' }}>
                  <Item />
                </div>
              </Col>
            </Row>
          </Container>

          {/* Add Exam Modal */}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Exam</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col sm={12}>
                    <div className=" border-0 shadow rounded-0 p-4">
                      <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                          <Form.Label >
                            Exam title
                          </Form.Label>
                          <Col sm={12}>
                            <Form.Control type="text" value={examTitle} onChange={(e) => (setExamTitle(e.target.value))} />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                          <Form.Label >
                            Exam type
                            <Form.Select aria-label="Default select example" value={examType} onChange={(e) => (setExamType(e.target.value))}>
                              <option>Select menu</option>
                              <option value="Examination">Examination</option>
                              <option value="Test">Test</option>
                            </Form.Select>
                          </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                          <Col sm={6}>
                            <Form.Label >
                              From:
                            </Form.Label>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} selectsStart startDate={startDate} endDate={endDate} minDate={new Date()} onChange={date => handleNewStartDate(date)} />
                          </Col>
                          <Col sm={6}>
                            <Form.Label >
                              To:
                            </Form.Label>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={endDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} onChange={date => setEndDate(date)} />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                          <Form.Label >
                            Classes To Participate
                            <MultiSelectDropdown options={classes} selected={selectedClasses} toggleOption={toggleClassOption} title="name" />
                          </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                          <Form.Label >
                            Subjects To Exclude
                            <MultiSelectDropdown options={subjects} selected={selectedSubjects} toggleOption={toggleSubjectOption} title="title" />
                          </Form.Label>
                        </Form.Group>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Close
              </Button>
              <Button variant="warning" onClick={addExamHandler}>
                Add Exam
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </>
  )
}

