import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import queryBackEnd, { validate } from '../queryBackEnd';

export default function SignUp() {
  // Define state variables to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [resp, setResp] = useState('');
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  // Function to display a toast notification using SweetAlert2
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
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Signup Successful',
    });
  };

  // Function to handle password validation
  const checkPassword = async (value, from) => {
    if (from === 'p1') {
      setPassword(value);
      const passwordCheck = await validate(value);
      setErrorMessage(passwordCheck.message);
      if (passwordCheck.status === 1) {
        setFontColor('#0B88B3');
      } else {
        setFontColor('#E97464');
      }
    } else {
      setPassword2(value);
      if (value !== password) {
        setErrorMessage2('Passwords DO NOT match!');
      } else {
        setErrorMessage2('');
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'p1') {
      setPasswordVisible1(!passwordVisible1);
    } else {
      setPasswordVisible2(!passwordVisible2);
    }
  };

  // Function to handle form submission
  const signUp = async (event) => {
    event.preventDefault();

    // Prevent submission if passwords do not match
    if (password2 !== password) {
      setResp('Passwords do not match. Please re-check your passwords');
      return false;
    }

    // Construct the data object with the variable names used in the backend
    const data = {
      email: email,
      password: password,
      first_name: firstName,
      surname: surname,
      other_names: otherNames,
    };

    // Make a request to the backend using the queryBackEnd function
    try {
      const response = await queryBackEnd('/signup', data);
      if (response.status === 1) {
        // Signup successful, display success message as a toast notification
        showToast();
        // Redirect to the login page after a delay
        setTimeout(() => {
          location.href = 'Login';
        }, 3000); // 3000 milliseconds (3 seconds) delay
      } else {
        setResp(response.message);
      }
    } catch (error) {
      setResp('An error occurred. Please try again later.');
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container image-fluid"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
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
            <form onSubmit={signUp}>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  required={true}
                  id="first_name"
                  style={{ marginLeft: '12px' }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your surname"
                  required={true}
                  id="surname"
                  style={{ marginLeft: '12px' }}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>

              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Other names"
                  required=""
                  id="other_names"
                  style={{ marginLeft: '12px' }}
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                />
              </div>

              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilEnvelope color="#0B88B3" size="25" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required={true}
                  id="email"
                  style={{ marginLeft: '12px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <input
                  type={passwordVisible1 ? "text" : "password"}
                  className="form-control"
                  placeholder="Create password"
                  required={true}
                  id="password"
                  style={{ marginLeft: '12px' }}
                  value={password}
                  onChange={(e) => checkPassword(e.target.value, 'p1')}
                />
                <div className="password-toggle" onClick={() => togglePasswordVisibility('p1')}>
                  {passwordVisible1 ? <Unicons.UilEyeSlash size="20" style={{ color: 'red' }} /> : <Unicons.UilEye size="20" style={{ color: 'red' }} />}
                </div>
                {errorMessage === '' ? null :
                  <span style={{
                    marginLeft: '10px',
                    fontSize: '11px',
                    color: fontColor,
                  }}>{errorMessage}</span>}
              </div>

              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <input
                  type={passwordVisible2 ? "text" : "password"}
                  className="form-control"
                  placeholder="Re-type password"
                  required={true}
                  id="password2"
                  style={{ marginLeft: '12px' }}
                  value={password2}
                  onChange={(e) => checkPassword(e.target.value, 'p2')}
                />
                <div className="password-toggle" onClick={() => togglePasswordVisibility('p2')}>
                  {passwordVisible2 ? <Unicons.UilEyeSlash size="20" style={{ color: 'red' }} /> : <Unicons.UilEye size="20" style={{ color: 'red' }} />}
                </div>
                {errorMessage2 === '' ? null :
                  <span style={{
                    marginLeft: '10px',
                    fontSize: '11px',
                    color: '#E97464',
                  }}>{errorMessage2}</span>}
              </div>

              <div className="form-check">
                <input type="checkbox" required={true} className="form-check-input" />
                <label className="form-check-label">
                  I accept all terms &amp; conditions
                </label>
              </div>
              <div className='mb-4 d-grid'>
                <button type="submit" className='btn button'>Register</button>
              </div>
              <div className="text">
                <h3>
                  Already have an account? <Link to="/Login">Login</Link>
                </h3>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
