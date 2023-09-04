import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './Landing.css'
import Linkedin from '../images/linkedin.png'
import colleagues from '../src/assets/colleagues .jpeg'
import girl from '../src/assets/girl.jpeg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





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
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle" />
          </div>
        </div>
        <div className="site-mobile-menu-body" />
      </div>
      <Navbar expand="lg" style={{ backgroundColor: "#8FC8DB" }}>
        <div className="container">
          <Navbar.Brand href="#">
            <h5>
              <b>EduQuest</b>
            </h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link href="index.html">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#" id="examsDropdown">About</Nav.Link>
              </Nav.Item>
    
              <Nav.Item>
                <Nav.Link href="services.html">Latest News</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="contact.html">Contact Us</Nav.Link>
              </Nav.Item>
              <Nav.Item className="cta-button">
                <Nav.Link href="#">
                  <b>Sign Up</b>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="cta-button">
                <Nav.Link href="#">
                  <b>Log In</b>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <span className="subheading mb-2" data-aos="fade-up">
                Welcome to our educational platform!
              </span>
              <h1 className="subheading mb-3" data-aos="fade-up" data-aos-delay={100}>
                <b>
                  We are delighted to have you here and accompany you on your
                  learning journey
                </b>
              </h1>
              <p
                className="mb-3"
                data-aos="fade-up"
                data-aos-delay={200}
                style={{ color: "black" }}
              >
                Whether you are a student, a teacher, or simply a lifelong learner,
                you will find a variety of courses, lessons, and resources here to
                enrich your knowledge and skills.
              </p>
              <p data-aos="fade-up" data-aos-delay={300}>
                <a href="#" className="btn btn-primary mr-2">
                  Learn More
                </a>{" "}
              </p>
            </div>
            <div className="col-lg-6">
              <div className="img-wrap" data-aos="fade-left">
                <img
                  src= {colleagues}
                  
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
              <span className="subheading mb-2">Features</span>
              <h1 className="heading mb-3">Our Features</h1>
              <p style={{ color: "black" }}>
                {" "}
                EduQuest offers a set of features for complete management of your
                exams
              </p>
            </div>
          </div>
          <div className="row g-5 text-center">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={0}>
              <div className="feature text-center">
                <div className="icon">
                  <span className="flaticon-startup" />
                </div>
                <h3>Launch of exam sessions</h3>
                <p style={{ color: "black" }}>
                  From their smartphone or PC, the establishment launches and
                  informs students in real time of the opening exam sessions{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
              <div className="feature text-center">
                <div className="icon">
                  <span className="flaticon-link" />
                </div>
                <h3>Management of exam subjects</h3>
                <p style={{ color: "black" }}>
                  Add or personalize subjects according to the specialties of your
                  establishment.
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
              <div className="feature text-center">
                <div className="icon">
                  <span className="flaticon-trophy" />
                </div>
                <h3>End of exam reports analysis of results.</h3>
                <p style={{ color: "black" }}>
                  Monitoring the grades of each student, and analyzing the results
                  online.
                </p>
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
              <h3 className="subheading mb-2">About us</h3>
              <h2 className="heading mb-4">why choose our application?</h2>
              <p style={{ color: "black" }}>
                Choose our educational app for an exceptional experience. With a
                variety of captivating teachers and exams, a user-friendly
                interface, and periodic end-of-session exam tracking, we&aposre your
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
                <a href="#" className="btn btn-primary">
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
      <footer
        style={{ backgroundColor: "#8FC8DB", textAlign: "center", padding: 5 }}
      >
        <div className="social-icons">
          <a href="https://www.facebook.com/yourpage">
            <img
              src="./images/facebook.png"
              alt="Facebook"
              style={{width:30, height: 30 }}
            />
          </a>
          <a href="https://twitter.com/yourpage" target="_blank" rel="noreferrer">
            <img src="./images/twiter.png" alt="Twitter" style={{ width: 30, height: 30 }} />
          </a>
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noreferrer">
            <img
              src={Linkedin}
              alt="Instagram"
              style={{ width: 30, height: 30 }}
            />
          </a>
        </div>
        <p className='pt-'>© 2023 Your Company. All rights reserved.</p>
      </footer>
     
    </>

  )
}