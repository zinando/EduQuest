import { useState } from 'react';
import '../../layout/Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import book from '../../assets/book.jpeg'
import { Card, Col, Row } from 'react-bootstrap';
import Login from '../../pages/Login/Login'
import queryBackEnd, { userInfo, checkUserPermission, logOutUser } from '../queryBackEnd'
import useIdle from '../../pages/useIdleTimer'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export default function Home() {

  // check for token and user permission 
  checkUserPermission('SUPER_DASHBOARD');

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // check if user is idle and logout user
  const { isIdle } = useIdle({ onIdle: logOutUser, idleTime: 1 });

  return (
    <>

      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <Container>
            <Row>
              <Col>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className='border-0 shadow rounded-0 p-4'
                />
              </Col>
              <Col xs={5}>
                <div className='border-0 shadow rounded-0 p-4'>
                  <h4 className="card-title fw-bold">Schedule</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>16.10.23</td>
                        <td>8:00am</td>
                        <td>English Language</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>18.10.23</td>
                        <td>10:30am</td>
                        <td>Mathematics</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>19.10.23</td>
                        <td>8:00am</td>
                        <td>French</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>20.10.23</td>
                        <td>8:00am</td>
                        <td>Geography</td>
                        <td>JSS 1</td>
                      </tr>
                    </tbody>
                  </Table>

                </div>
              </Col>
              <Col>
                <div className="card-body card text-center border-0 shadow rounded-0 p-4">
                  <h4 className="card-title fw-bold">User Stats</h4>
                  <ul className="card-text">
                    <li>
                      12 <span>Teachers</span>
                    </li>
                    <li>
                      403 <span>Students</span>
                    </li>
                    <li>
                      6 <span>Reviewers</span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={7}>
                <div className='pt-4'>
                  <ListGroup horizontal>
                    <ListGroup.Item>This</ListGroup.Item>
                    <ListGroup.Item>ListGroup</ListGroup.Item>
                    <ListGroup.Item>renders</ListGroup.Item>
                    <ListGroup.Item>horizontally!</ListGroup.Item>
                    <ListGroup.Item>horizontally!</ListGroup.Item>
                  </ListGroup>
                </div>
              </Col>
              <Col sm={5}>
                <div className=" border-0 shadow rounded-0 p-4">
                  <h4 className="card-title fw-bold">Add Exam form</h4>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                      <Form.Label column sm={2}>
                        Exam title
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label column sm={2}>
                        Exam type
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="select" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label column sm={2}>
                        Exam type
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="select" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label column sm={2}>
                        From
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="select" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                      <Form.Label column sm={2}>
                        To
                        <Form.Select aria-label="Default select example">
                          <option>select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control type="select" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Sign in</Button>
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

