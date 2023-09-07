import '../../layout/Sidebar/Sidebar.css'
import Navbar from '../../layout/NavBar/NavBar'
import Sidebar from '../../layout/Sidebar/SideBar'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function Subject() {
  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />

        <div className="home-content">
          <h3 className='ps-3'>Subject</h3>
          <ButtonGroup className="mb-3 btn-group" size="sm">
            <Button className='btn' >Left</Button>
            <Button className='btn' >Middle</Button>
            <Button className='btn' >Right</Button>
          </ButtonGroup>
          <div className="box-card">
            <div className="recent box">
              <div className="title">Stats</div>
              <div className="sdetails">
                <ul className="details">
                  <li className="topic">Date</li>
                  <li>
                    <a href="/">02 Jan 2023</a>
                  </li>



                </ul>
                <ul className="details">
                  <li className="topic">Name</li>
                  <li>
                    <a href="/">Alex Doe</a>
                  </li>
                </ul>
                <ul className="details">
                  <li className="topic">Grade</li>
                  <li>
                    <a href="/">Passed</a>
                  </li>
                </ul>
                <ul className="details">
                  <li className="topic">Teacher</li>
                  <li>
                    <a href="/">Peace</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


      </section>

    </>
  )
}

