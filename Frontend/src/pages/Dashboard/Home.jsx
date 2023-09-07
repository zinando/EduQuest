import '../../layout/Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Form from 'react-bootstrap/Form';


export default function Home() {
  return (
    <>

      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Subject</div>
                <div className="number">8</div>
                <div className="indicator">
                  <Unicons.UilArrowUp className="i" />
                  <span className="text"></span>
                </div>
              </div>
              <Unicons.UilBooks className="uicon" />
            </div>
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

