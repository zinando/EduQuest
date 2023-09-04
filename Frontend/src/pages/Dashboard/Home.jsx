import SideBar from '../../layout/Sidebar/SideBar';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';


export default function Home() {
  return (
    <>
      <div className="hm-container">
        <SideBar />
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="home-header">Welcome to the Dashboard Home Page</h1>
              <p>This is the main overview of your dashboard.</p>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <div className="data-summary">
                <h4 className='title'>Schedule</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                  <li>Revenue: $50,000</li>
                </ul>
              </div>
            </Col>
            <Col md={4}>
              <div className="data-summary">
                <h4>Calendar</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                </ul>
              </div>
            </Col>

            <Col md={3} >
              <div className="data-summary" >
                <h4>Tasks</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <div className="data-summary">
                <h4>Examination</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                  <li>Revenue: $50,000</li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div className="data-summary">
                <h4>Data Summary</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div className="data-summary">
                <h4>Review Results</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                </ul>
              </div>
            </Col>

            <Col md={9}>
              <div className="data-summary">
                <h4>Performance</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>
                  <li>Total Orders: 500</li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div className="data-summary">
                <h4>Game</h4>
                <p>Here&apos;s a quick summary of your data:</p>
                <ul>
                  <li>Total Users: 1000</li>

                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
