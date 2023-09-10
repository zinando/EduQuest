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



export default function Home() {
  
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
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
                <a href="/">
                  Tasks
                </a>
              </div>
              <ul className="top-sdetails">
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Study Mathematics</span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>

                </li>
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Submit chemistry assignment </span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>
                </li>
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Attend dance class</span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>
                </li>
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Geograpray map talk</span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>
                </li>
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Lunch break</span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>
                </li>
                <li>
                  <a href="/">
                    <Form.Check aria-label="option 1" className='pe-3' />
                    <span className="task">Rest</span>
                  </a>
                  <span className="price"><Unicons.UilTimes /> </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

