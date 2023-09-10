import 'bootstrap/dist/css/bootstrap.min.css'
import './SignUp.css';
import * as Unicons from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import queryBackEnd from '../queryBackEnd'


export default function SignUp() {
  // Function to handle form submission
  const signUp = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = {
      first_name: document.getElementById('first_name').value,
      surname: document.getElementById('surname').value,
      email: document.getElementById('email').value,
      other_names: document.getElementById('other_names').value,
      password: document.getElementById('password').value,
    };

    // Make a request to the backend
    try {
      const response = await queryBackEnd('http://localhost:5000', 'register', formData);
      if (response.status === 1) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };




  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
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
                  required=""
                  id="first_name"
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
                  required=""
                  id="surname"
                />
              </div>

              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilBookReader color="#0B88B3" size="25" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Other names"
                  required=""
                  id="other_names"
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
                  required=""
                  id="email"
                />
              </div>



              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create password"
                  required=""
                  id="password"
                />
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
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
