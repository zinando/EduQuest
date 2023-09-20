import '../Schedule/Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Scheduler from '../../component/Scheduler/Scheduler';


export default function Exam() {


  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">

          <Container>
            <Row>
              <Col xs={8}>

                <Scheduler />


              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
