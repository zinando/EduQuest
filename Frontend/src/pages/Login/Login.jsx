import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Unicons from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Login() {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };




  return (
    <>
      <div className="container-fluid content">
        <div className='row'>
          <div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>
          <div className="col-lg-6 col-md-6 col-sm-12 form-container">
            <Link to="/error" className='mb-3 logo'><h2 className='logo'>Edu<span className='quest'>Quest</span></h2></Link>
            <Form>
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label htmlFor="name" className='form2'>
                  <Unicons.UilUser color="#8FC8DB" size="20" />
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  required=""
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Label htmlFor="name" className='form2'>
                  <Unicons.UilLock color="#8FC8DB" size="20" />
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required=""
                />
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                <Col sm={{ span: 5, offset: 0 }}>
                  <Form.Check label="Remember me" />
                </Col>
              </Form.Group>

              <div className='mb-4 d-grid'>
                <Link to="/Home" className='btn button'>Login</Link>
              </div>

              <div className="text">
                <h3>
                  Already have an account? <Link to="/SignUp">Sign Up</Link>
                </h3>
                <h3>
                  <Link to="/Home" onClick={handleBack} >Forgot your password?</Link>
                </h3>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

 
