import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import * as Unicons from '@iconscout/react-unicons'
import './Login.css';
import queryBackEnd from '../queryBackEnd'




export default function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);

      // Get user input
      const userid = form.elements.userid.value;
      const password = form.elements.password.value;

      // Create an object with the user input
      const userData = {
        userid,
        password,
      };

      // Send a POST request to your Flask backend using queryBackEnd
      const response = await queryBackEnd('http://localhost:5000/login', '', userData);

      // Handle the response from the backend
      if (response.status === 1) {
        // Login successful, you can redirect the user or perform other actions
        console.log('Login successful');
      } else {
        // Login failed, handle error (e.g., display an error message)
        console.error('Login failed:', response.message);
      }
    }
  };


  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
            <Link to="/" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <Form.Group as={Col} md="4" controlId="validationCustom01">

                  <Form.Control
                    className="form-control"
                    required
                    type="text"
                    placeholder="Enter first name"
                  
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter password"
                    
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </div>
    
              <div className="form-check">
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Remember me"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
              </div>
              <Button type="submit" className='btn button'>Login</Button>
              <div className='mb-4 d-grid'>
              <div className="text">
                <h3>
                  Don&apos;t have an account? <Link to="/Signup">SignUp</Link>
                </h3>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

