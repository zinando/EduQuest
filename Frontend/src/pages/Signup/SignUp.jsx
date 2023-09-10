import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>

          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
            <Link to="/" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            <form action="#">
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#0B88B3" size="25" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  required=""
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
                />
              </div>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilBookReader color="#0B88B3" size="25" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create Username"
                  required=""
                />
              </div>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilBookReader color="#0B88B3" size="25" />
                </label>
                <select id="class" name="class" className="form-control" required="">
                  <option value="">Select a class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </select>

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
                />
              </div>
              <div className="form-group mb-3 d-flex align-items-center">
                <label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#0B88B3" size="25" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  required=""
                />
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">
                  I accept all terms &amp; conditions
                </label>
              </div>
              <div className='mb-4 d-grid'>
                <Link to="/Home" className='btn button'>Register</Link>
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
