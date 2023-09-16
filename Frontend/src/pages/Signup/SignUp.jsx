import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import queryBackEnd from '../queryBackEnd';

export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [otherNames, setOtherNames] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const data = {
        email: email,
        password: password,
        first_name: firstName,
        surname: surname,
        other_names: otherNames,
      };

      try {
        const response = await queryBackEnd('/signup', data);
        if (response.status === 1) {
          alert('Registration successful! ' + response.message);
          window.location.href = 'Login'; // Use 'window.location.href' to redirect
        } else {
          alert('Registration failed. Please try again. ' + response.message);
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
        console.error(error);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
            <Link to="/" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Col} md="6" controlId="validationCustom01" className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="first_name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  First name is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02" className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="surname" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <Form.Control
                  type="text"
                  placeholder="Enter your surname"
                  required
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Last name is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03" className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="other_names" className='form2'>
                  <Unicons.UilBookReader color="#0B88B3" size="25" />
                </label>
                <Form.Control
                  type="text"
                  placeholder="Other names"
                  required
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Other names are required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04" className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="email" className='form2'>
                  <Unicons.UilEnvelope color="#0B88B3" size="25" />
                </label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a valid email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom05" className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="password" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <Form.Control
                  type="password"
                  placeholder="Create password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Password is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="I accept all terms & conditions"
                  feedback="You must accept the terms & conditions."
                  feedbackType="invalid"
                />
              </Form.Group>
              <div className='mb-4 d-grid'>
                <Button type="submit" className='btn button'>Register</Button>
              </div>
              <div className="text">
                <h3>
                  Already have an account? <Link to="/Login">Login</Link>
                </h3>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
