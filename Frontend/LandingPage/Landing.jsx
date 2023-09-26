import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Landing.css'
import colleagues from '../src/assets/colleagues .jpeg'
import girl from '../src/assets/girl.jpeg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../Frontend/src/assets/Group 1.png'
import * as Unicons from '@iconscout/react-unicons';



export default function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration in milliseconds
      easing: 'ease-out-back', // Easing type
      once: true, // Only trigger animations once
    });
  }, []);



  return (
    <>
    
      <Navbar expand="lg" style={{ backgroundColor: "white",marginTop: '10px' }}>
        <div className="container">
          <div className="logo-details">
            <Link to="/Login" className="logo">
              <img src={logo} alt="eduquest log" className="small-image" />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Item
              style={{ marginTop: '10px' }}
              >
                <Nav.Link href="#">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item
              style={{ marginTop: '10px' }}
              >
                <Nav.Link href="#" >About</Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginTop: '10px' }}>
                <Nav.Link href="#">Latest News</Nav.Link>
              </Nav.Item>
              <Nav.Item
              style={{ marginTop: '10px' }}
              >
                <Nav.Link href="#">Contact Us</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn">
                <Link to="/signup">
                  Sign Up
                </Link>
              </Nav.Item> 
              <Nav.Item className="cta-button2" 
              style={{ marginTop: '10px' }}
              >
                <Link to="/login">
                  Log In
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <span className="heading mb-2" data-aos="fade-up">
                Welcome to our educational platform!
              </span>
              
              <p
                className="mb-3 pt-3 paragraph"
                data-aos="fade-up"
                data-aos-delay={200}
                style={{ color: "black"  }}
              >
                Whether you are a student, a teacher, or simply a lifelong learner,
                you will find a variety of courses, lessons, and resources here to
                enrich your knowledge and skills.
              </p>
              <div className='pt-4'>
                <a href="#" className="btn mr-2" data-aos="fade-up" data-aos-delay={300}>
                  Get Started
                </a>{" "}
                <a href="#" className="btn-outline-primary mr-2" data-aos="fade-up" data-aos-delay={300}>
                  Learn More
                </a>{" "}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="img-wrap" data-aos="fade-left">
                <img
                  src={colleagues}

                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section pt-0 section-2" style={{ backgroundColor: "white" }}>
        <div className="container">
          <div className="row mb-6">
            <div className="col-lg-5 mx-auto text-center" data-aos="fade-up">
              <br />
              <span className="subheading">Features</span>
              
              <p style={{ color: "black" }} className='paragraph pt-4'>
                {" "}
                EduQuest offers a set of features for complete management of your
                exams
              </p>
            </div>
          </div>
          <div className="row g-5 text-center pt-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={0}>
              <div className="card card-1">
                <div className="card-body">
                  <div className="icon-circle-1">
                    <Unicons.UilBookOpen size="40" color="#FFF" />
                  </div>
                  <h4 className="card-title">Launch of exam sessions</h4>
                  <p className="card-text" style={{ color: "white" }}>
                    From their smartphone or PC, the establishment launches and
                    informs students in real-time of the opening exam sessions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
              <div className="card">
                <div className="card-body">
                  <div className="icon-circle">
                    <Unicons.UilBookOpen />
                  </div>
                  <h4 className="card-title">Management of exam subjects</h4>
                  <p className="card-text" style={{ color: "black" }}>
                    Add or personalize subjects according to the specialties of your
                    establishment.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
              <div className="card">
                <div className="card-body">
                  <div className="icon-circle">
                    <Unicons.UilBookOpen />
                  </div>
                  <h4 className="card-title">
                    Reports analysis of results.
                  </h4>
                  <p className="card-text" style={{ color: "black" }}>
                    Monitor the grades of each student and analyze the results online.
                  </p>
                </div>
              </div>
            </div>
          </div>





        </div>
      </div>
      <div className="section section-3" style={{ backgroundColor: "white" }}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6" data-aos="fade-up">
              <img src={girl} alt="Image" className="img-fluid" />
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <h3 className="subheading mb-1">About us</h3>
              <h2 className="heading mb-3">why choose our application?</h2>
              <p style={{ color: "black" }}>
                Choose our educational app for an exceptional experience. With a
                variety of captivating teachers and exams, a user-friendly
                interface, and periodic end-of-session exam tracking, we are your
                ideal partner in your quest for knowledge. Join our community of
                passionate users today and take the first step towards a brighter
                future..
              </p>
              <ul
                className="list-check list-unstyled mb-5"
                style={{ color: "black" }}
              >
                <li>
                  🚀 Elevate Your Learning: Our app offers top-quality content and
                  expert guidance
                </li>
                <li>
                  🌐 Diverse Subjects: Explore a wide range of courses tailored to
                  your school.
                </li>
                <li>
                  🎯 Your success is our priority: Get in touch with us today to
                  achieve your educational goals
                </li>
              </ul>
              
             <p>
                <a href="#" className="btn">
                  About us
                </a>
              </p>
            </div>
            <div
              className="col-lg-12"
              data-aos="fade-up"
              style={{ textAlign: "center" }}
            >
              <p style={{ color: "black" }}>
                At EduQuest, we believe in the power of education to shape a better
                future. Our dedicated team is committed to providing quality
                learning resources, inspiring curiosity and encouraging ongoing
                mentoring. We share a passion for educational excellence and are
                proud to support you on your learning journey. Find out who we are
                and join us on this adventure towards knowledge and success.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className='custom-heading'>MEET THE TEAM</h2>
            <div className='authors'>
                  <div className="slide">
                    <img src="./images/image2.jpg" alt="image2"style={{width: 200, height: 200, borderRadius:150,}}/>
                    <p>Front-end Developer<br/>Peace Chinagwam </p>
                  </div>
                  <div className="slide">
                    <img src="./images/image4.jpg" alt="image4"style={{width: 200, height: 200, borderRadius:150,}}/>
                    <p>Front-end Developer<br/>ALI Essonani </p>
                  </div>
                    <div className="slide">
                      <img src="./images/image1.jpg" alt="image1"style={{width: 200, height: 200, borderRadius:150,}}/>
                      <p>Backend Developer <br/>Samuel Ndubumma </p>
                    </div>
                  <div className="slide">
                    <img src="./images/image3.jpg" alt="image3"style={{width: 200, height: 200, borderRadius:150,}}/>
                    <p>Backend Developer <br/>Justice Maduka </p>
                    </div>
            </div>

      <footer
        style={{ backgroundColor: "#b8dbe7", textAlign: "center", padding: 5 }}
      >
        <div className="social-icons">
          <a href="https://www.facebook.com/yourpage">
            <img
              src="./images/facebook.png"
              alt="Facebook"
              style={{ width: 30, height: 30 }}
            />
          </a>
          <a href="https://twitter.com/yourpage" target="_blank" rel="noreferrer">
            <img src="./images/twiter.png" alt="Twitter" style={{ width: 35, height: 33 }} />
          </a>
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer">
            <img src="./images/instagram.png" alt="Instagram" style={{ width: 35, height: 33 }} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <img src="./images/linkedin.png" alt="Instagram" style={{ width: 35, height: 30 }} />
          </a>
        </div>
        <p className='pt-'>© 2023 Your Company. All rights reserved.</p>
      </footer>

    </>

  )
}