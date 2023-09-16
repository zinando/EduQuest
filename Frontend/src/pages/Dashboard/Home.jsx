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
  const {isIdle} = useIdle({onIdle: logOutUser, idleTime: 1});
  
  return (
    <>

      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className="overview-boxes">
            
              <Calendar
                onChange={handleDateChange}
                value={date}
              />
            
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Timetable</div>
                <div className="number"></div>
                <div className="indicator">
                  <Unicons.UilArrowUp className="i" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <Unicons.UilClock className="uicon two" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Teachers</div>
                <div className="number">6</div>
                <div className="indicator">
                  <Unicons.UilArrowUp className="i" />
                  <span className="text"></span>
                </div>
              </div>
              <Unicons.UilTable className="uicon three" />
            </div>

          </div>
          <div className="box-card">
            <div className="recent box">
              <div className="title">Notice board</div>
              <div className="sdetails">
                <ul className="details"> 
                  <div className='card' style={{ marginBottom: '20px' }}>
                    <Row>
                      <Col md={3}>
                        <Card.Img variant="top" src={book} style={{ width: '60%', height: 'auto' }} />
                      </Col>
                      <Col md={6}>
                        This is some text within a card body.
                      </Col>
                    </Row>
                  </div>
                  <div className='card' style={{ marginBottom: '20px' }}>
                    <Row>
                      <Col md={3}>
                        <Card.Img variant="top" src={book} style={{ width: '60%', height: 'auto' }} />
                      </Col>
                      <Col md={6}>
                        This is some text within a card body.
                      </Col>
                    </Row>
                  </div>
                </ul>
              </div>
            </div>
            <div className="top box">
              <div className="title">
                <a href="/">Tasks</a>
              </div>
              <ul className="top-sdetails">
                <li>
                  <Form.Control
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <button onClick={addTask}className='btn' >Add</button>
                </li>
                {tasks.map((task, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      aria-label={`checkbox-${index}`}
                      className="pe-3"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(index)}
                      id={`checkbox-${index}`} // Add an ID to the checkbox
                    />
                    <label
                      htmlFor={`checkbox-${index}`} // Use the corresponding ID for the label
                    >
                      <span
                        className={`task ${task.completed ? 'completed-task' : ''}`}
                      >
                        {task.text}
                      </span>
                    </label>
                    <span className="price" onClick={() => removeTask(index)}>
                      <Unicons.UilTimes />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

