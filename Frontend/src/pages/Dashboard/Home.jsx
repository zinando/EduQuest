import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Home.css';

export default function Home() {
  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className='home'>
          <Container>
            <Row md={4}>
              <Col>
                <div className="card text-center border-0 shadow rounded-0 p-4" style={{ maxWidth: "22rem" }}>
                  <div className="icon">
                    <i className="bi bi-cloud-drizzle-fill" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title fw-bold">Card title</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and make up the bulk of
                      the card&rsquo;s content.
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="card text-center border-0 shadow rounded-0 p-4" style={{ maxWidth: "22rem" }}>
                  <div className="icon">
                    <i className="bi bi-cloud-drizzle-fill" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title fw-bold">Card title</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and make up the bulk of
                      the card&rsquo;s content.
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="card text-center border-0 shadow rounded-0 p-4" style={{ maxWidth: "22rem" }}>
                  <div className="icon">
                    <i className="bi bi-cloud-drizzle-fill" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title fw-bold">Card title</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and make up the bulk of
                      the card&rsquo;s content.
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="card text-center border-0 shadow rounded-0 p-4" style={{ maxWidth: "22rem", height: "700px" }}>
                  <div className="icon">
                    <i className="bi bi-cloud-drizzle-fill" />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title fw-bold">Card title</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and make up the bulk of
                      the card&rsquo;s content.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <div className='news-board pt-5'>
              <Row>
                <Col>
                  <div className="card text-center border-0 shadow rounded-0 p-4" style={{ maxWidth: "60rem" }}>
                    <div className="icon">
                      <i className="bi bi-cloud-drizzle-fill" />
                    </div>
                    <div className="card-body">
                      <h4 className="notice-board">Notice Board</h4>
                      <p className="card-text">
                        <ul>
                          <li>Some quick example text to build on the card title</li>
                          <li>Some quick example text to build on the card title</li>
                          <li>Some quick example text to build on the card title</li>
                          <li>Some quick example text to build on the card title</li>
                          <li>Some quick example text to build on the card title</li>
                          <li>Some quick example text to build on the card title</li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
