import { useState } from 'react';
import '../../layout/Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import {Col, Row } from 'react-bootstrap';
import Login from '../../pages/Login/Login'
import queryBackEnd, { userInfo, checkUserPermission, logOutUser } from '../queryBackEnd'
import useIdle from '../../pages/useIdleTimer'
import Container from 'react-bootstrap/Container';
import Timetable from '../../component/Timetable/Timetable'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Item from '../../component/Item/Item'
import './Home.css'


export default function Home() {

  // check for token and user permission 
  checkUserPermission('SUPER_DASHBOARD');

  const [date, setDate] = useState(new Date());
 
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
              
              <Col xs={4}>
                <div className='calendar-container' style={{height: '300px'}}>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className='border-0 shadow rounded-0 p-4'
                  />
                </div>
                </Col>
            
              <Col xs={6} >
                <div className='border-0 shadow rounded-0 p-4 ' style={{ height: '300px', overflowY: 'scroll' }}>
                  <Timetable/>
                </div>
              </Col>
              <Col xs={2}>
                <div className=" border-0 shadow rounded-0 p-4 time" style={{height: '300px'}}>
                  <h4 className="custom-heading">User Stats</h4>
                  <ul className="card-text" style={{ listStyle: 'none', padding: 10 }}>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="teachers"><Unicons.UilUsersAlt color="#0B88B3" size="25" /></span> <span style={{ marginLeft: '10px' }}>12</span>
                    </li><br/>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="students"><Unicons.UilGraduationCap color="#0B88B3" size="25" /></span> <span style={{ marginLeft: '10px' }}>403</span>
                    </li><br/>
                    <li style={{ marginBottom: '10px' }}>
                      <span style={{ marginRight: '15px' }} title="reviewers"><Unicons.UilFilesLandscapes color="#0B88B3" size="25" /></span> <span style={{ marginLeft: '10px' }}>6</span>
                    </li>
                  </ul>
                </div>

              </Col>
            </Row>
            <Row>
              <Col sm={7}>
                <div className='pt-4' style={{ height: '500px', overflowY: 'scroll' }}>
                 <Item/>
                </div>
              </Col>
              <Col sm={5}>
                <div className=" border-0 shadow rounded-0 p-4">
                  <h4 className="card-title fw-bold">Add Exam form</h4>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                      <Form.Label >
                        Exam title
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label >
                        Exam type
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>               
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label >
                        From
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label >
                        To
                        <Form.Select aria-label="Default select example">
                          <option>Exam type</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" className='btn button'>Submit</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  )
}

