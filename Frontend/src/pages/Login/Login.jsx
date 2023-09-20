import { useState } from 'react';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import * as Unicons from '@iconscout/react-unicons'
import '../Signup/SignUp.css'
import queryBackEnd, { setSession, userInfo } from '../queryBackEnd'


export default function Login() {
  const [validated, setValidated] = useState(false);
  const [resp, setResp] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      const response = await queryBackEnd('/login', userData);

      // Handle the response from the backend
      if (response.status === 1) {
        // Login successful, create session and store user data
        setSession(response);
        if (userInfo().adminType === 'super') {
          // redirect to super admin dashboard
          location.href = '/home';
        }
      } else {
        // Login failed, display error to user and log on console
        var msg = "";
        for (var i = 0; i < response.error.length; i++) {
          msg += response.error[i] + '\n';
        }
        setResp(msg);
        console.error('Login failed:', response.message, '\n' + msg);
      }
    }
  };

  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container image-fluid"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container" style={{
            paddingBottom: '200px'
          }}>
            <div className='row'>
              <div
                className="col-12 text-center"
                style={{
                  color: '#E97464',
                  marginBottom: '12px'
                }}>{resp}
              </div>
            </div>
            <Link to="/" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  className="form-control"
                  required={true}
                  name='userid'
                  type="text"
                  placeholder="Enter userid or email"
                  style={{ marginLeft: '12px' }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </div>

              <div className="form-group mb-3 pt-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  className="form-control"
                  required={true}
                  name='password'
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  style={{ marginLeft: '12px' }}
                />
                <div className="password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Unicons.UilEyeSlash size="25" /> : <Unicons.UilEye size="25" />}
                </div>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </div>

              <div className="form-check">
                <input type="checkbox" required={true} className="form-check-input" />
                <label className="form-check-label">
                  Remember me
                </label>
              </div>

              <div className='mb-4 d-grid'>
                <button type="submit" className='btn button'>Login</button>
              </div>
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
