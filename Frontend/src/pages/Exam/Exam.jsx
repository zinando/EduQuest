import ListGroup from 'react-bootstrap/ListGroup';
import '../../layout/Sidebar/SideBar.css'
import Sidebar from '../../layout/Sidebar/SideBar'
import Navbar from '../../layout/Navbar/NavBar'


export default function Exam() {
  return (
    <>
      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>

          </ListGroup>

          
        </div>
      </section>
    </>
  )
}

