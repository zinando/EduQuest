import SideBar from '../../layout/Sidebar/SideBar';
import './Subject.css'
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Book from '../../assets/book.jpeg';

export default function Schedule() {
  // State to track the selected button
  const [selectedButton, setSelectedButton] = useState(null);

  // Define an array of button labels
  const buttonLabels = ['Day', 'Status', 'Subject'];

  // Function to handle button click
  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const cardStyle = {
    width: '100%', // Set width to 100% for responsiveness
    borderRadius: '15px',
  };

  const cardImageStyle = {
    width: '100%', // Set width to 100% to fill the card width
    height: '100%', // Set height to 100% to fill the card height
    objectFit: 'cover',
  };

  return (
    <>
      <div className="schedule-container">
        <SideBar />
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="home-header pt-5">Schedule</h1>
              <div className='pb-3 pt-3 group-btn'>
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

          <Row>
            <Col md={5}>
              <Card style={cardStyle}>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={Book}
                      style={cardImageStyle}
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>Geography</Card.Title>
                      <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim vestibulum dui, at suscipit lacus varius in.
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col md={5}>
              <Card style={cardStyle}>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={Book}
                      style={cardImageStyle}
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>Geography</Card.Title>
                      <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim vestibulum dui, at suscipit lacus varius in.
                      </Card.Text>
                    </Card.Body>
                    <Card.Body>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
