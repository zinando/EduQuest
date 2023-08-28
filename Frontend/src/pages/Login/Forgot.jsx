import './Forgot.css'
import { Link } from 'react-router-dom';

export default function Forgot() {
  return (
    <div className='d-flex flex-column container cont'>
      <div className='align-items-center justify-content-center g-0 min-vh-100 row'>
        <div className='py-8 py-xl-0 col-xxl-4 col-lg-6 col-md-8 col-12 card-container'>
          <div className='smooth-shadow-md card'>
            <div className='p-6 card-body'>
              <div className='mb-4'>
                <Link to="/SignUp" className='mb-3 logo'>Edu<span className='quest'>Quest</span><span className='yellow'>.</span></Link>

                <p className='mb-6'>
                  Dont&apos; t worry, we&apos;ll send you an email to rest your password.
                </p>
                <form action="">
                  <div className='mb-4'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" placeholder='Enter Your Email' className='form-control' id='email' />
                  </div>
                  <div className='mb-4 d-grid'>
                    <button type='submit' className='btn button'>Reset Password</button>
                  </div>
                  <span className='note'>
                    Don&apos;t have an account?
                    <Link to="/SignUp">SignUp</Link>

                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}