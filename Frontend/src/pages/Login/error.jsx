import './Forgot.css'
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/404.jpeg'

export default function error() {
  return (
    <div className='d-flex flex-column container'>
      <div className='align-items-center justify-content-center g-0 min-vh-100 row'>
        <div className='py-8 py-xl-0 col-xxl-4 col-lg-6 col-md-8 col-12'>
          <div className='mb-4 '>
            <span className='error'>40<span className='quest'>4</span><span className='yellow'>.</span></span>
            <h3>Page Not Found :( </h3>
            <p>Oops! The requested URL was not found on the server</p>
          </div>

          <div>
            <img src={ErrorImage} alt="" className='img-fluid' />
          </div>
          <div className='mb-4 d-grid'>
            <Link to="/Signup" className='btn button'>Back to Home</Link>
          </div>
        </div>

      </div>
    </div>
  )
}