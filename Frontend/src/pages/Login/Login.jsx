import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as Unicons from '@iconscout/react-unicons';
import '../Signup/SignUp.css';
import queryBackEnd, { setSession, userInfo } from '../queryBackEnd';
import Swal from 'sweetalert2';


export default function Login() {
  const [validated, setValidated] = useState(false);
  const [resp, setResp] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to show SweetAlert2 toast notification
  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
    });
  };

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

        // Show success toast notification
        showToast();
      } else {
        // Login failed, display error to user and log on console
        var msg = '';
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
        <div className="row">
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container image-fluid"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container mx-auto" style={{ paddingBottom: '200px' }}>
            <div className="row">
              <div className="col-12 text-center" style={{ color: '#E97464', marginBottom: '12px' }}>
                {resp}
              </div>
            </div>
            <Link to="/" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className="form2">
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  className="form-control"
                  required={true}
                  name="userid"
                  type="text"
                  placeholder="Enter userid or email"
                  style={{ marginLeft: '12px' }}
                />
                
              </div>

              <div className="form-group mb-3 pt-3 d-flex align-items-center">
                <label htmlFor="name" className="form2">
                  <Unicons.UilKeySkeleton color="#0B88B3" size="25" />
                </label>
                <input
                  className="form-control"
                  required={true}
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter password"
                  style={{ marginLeft: '12px' }}
                />
                <div className="password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <Unicons.UilEyeSlash size="25" /> : <Unicons.UilEye size="25" />}
                </div>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">Remember me</label>
                <h3>
                  <Link to="/Forgot">Forgot Password?</Link>
                </h3>
              </div>
              

              <div className="mb-4 d-grid">
                <button type="submit" className="btn">
                  Login
                </button>
              </div>
              <div className="mb-4 d-grid">
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
