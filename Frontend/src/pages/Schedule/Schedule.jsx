import SideBar from '../../layout/Sidebar/SideBar';
import Table from 'react-bootstrap/Table';
import './Schedule.css'
import { Container, Row, Col } from 'react-bootstrap';
import  { useState } from 'react';




export default function Schedule() {
  
    // State to track the selected button
    const [selectedButton, setSelectedButton] = useState(null);

    // Define an array of button labels
    const buttonLabels = ['Button 1', 'Button 2', 'Button 3'];

    // Function to handle button click
    const handleButtonClick = (index) => {
      setSelectedButton(index);
    };

    
    return (
      <>
        <div className="schedule-container">
          <SideBar />
          <Container>

            <Row>
              <Col md={12}>
                <h1 className="home-header pt-5">Schedule</h1>
                <div className='pb-4'>
                  {buttonLabels.map((label, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={selectedButton === index ? 'selected' : ''}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob </td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Jacob </td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      
      </>
    );
  }