import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'; 
import './Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';


export default function Subject() {
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
         
          <Container>
            <Row>
              <Col xs={8}>
                <div className='border-0 shadow rounded-0 p-4' style={{ height: '300px', overflowY: 'scroll' }}>
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
                      <tr>
                        <td>20.10.23</td>
                        <td>8:00am</td>
                        <td>Geography</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>20.10.23</td>
                        <td>8:00am</td>
                        <td>Geography</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>19.10.23</td>
                        <td>8:00am</td>
                        <td>French</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>19.10.23</td>
                        <td>8:00am</td>
                        <td>French</td>
                        <td>JSS 1</td>
                      </tr>
                      <tr>
                        <td>19.10.23</td>
                        <td>8:00am</td>
                        <td>French</td>
                        <td>JSS 1</td>
                      </tr>
                    </tbody>
                  </Table>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
