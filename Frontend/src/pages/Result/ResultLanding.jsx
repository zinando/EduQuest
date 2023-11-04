import { useState, useEffect } from 'react';
import queryBackEnd, { userInfo, isObjectEmpty } from '../../pages/queryBackEnd';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {Row, Col, Container, Table} from 'react-bootstrap';



const ResultLanding = () => {
    const [classList, setClassList] = useState({});

    useEffect(() => {
        fetchExamClasses();
    },[])

    const fetchExamClasses = () => {
        const url = '/dashboard/'+ userInfo().adminType;
        const action = 'FETCH-EXAM-CLASS-LIST';
        const data = {};
        const method = 'POST';
        let myData = classList;

        // Fetch data from the backend
        queryBackEnd(url, data, action, method)
          .then((response) => {
                if (response.status === 1){
                myData = response.data;
            } else {
                console.log(response.message);
            }
            setClassList(myData);
          })
          .catch((error) => console.error(error));
    }

    return (
        <>
          <Sidebar />
          <section className="home-section">
            <Navbar />
            <div className="home-content">
              <Container>
              {!isObjectEmpty(classList) && (
              <>
                 <Row>
                    <Col sm={12}>
                        <Card style={{backgroundColor: "#ffcd6e", paddingTop: "10px"}}>
                            <Row className="d-flex justify-content-center">
                                <Col sm={10} className="text-center">
                                    <Typography variant="h5" gutterBottom>
                                        {classList.title}
                                    </Typography>
                                </Col>
                            </Row>
                            <Row style={{padding: "0px 25px"}}>
                                <Col sm={5}>
                                    <Row>
                                        <Col sm={4}>
                                            <Typography variant="body2" gutterBottom>
                                                From:
                                            </Typography>
                                        </Col>
                                        <Col sm={8}>
                                            <Typography variant="body2" gutterBottom>
                                                {classList.start}
                                            </Typography>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={2}>
                                </Col>
                                <Col sm={5}>
                                    <Row>
                                        <Col sm={2}>
                                             <Typography variant="body2" gutterBottom>
                                                To:
                                            </Typography>
                                        </Col>
                                        <Col sm={10}>
                                            <Typography variant="body2" gutterBottom>
                                                {classList.end}
                                            </Typography>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: "110px"}}>
                    <Col sm={12}>
                        <Card style={{backgroundColor: "#0b88b3", paddingTop: "10px"}}>
                            <Row>
                                <Col sm={2} className="d-flex justify-content-center">
                                    <Typography variant="h5" gutterBottom style={{color:"#ffffff"}}>
                                        S/N
                                    </Typography>
                                </Col>
                                <Col sm={8} className="d-flex justify-content-center">
                                    <Typography variant="h5" gutterBottom style={{color:"#ffffff"}}>
                                        Class Name
                                    </Typography>
                                </Col>
                                <Col sm={2} className="d-flex justify-content-center" style={{color:"#ffffff"}}>
                                    <Typography variant="h5" gutterBottom>
                                        Action
                                    </Typography>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                {classList.list_items.map((item, index) =>(
                <Row>
                    <Col sm={2}>
                        <Card className="alert alert-info text-center">
                             <Typography variant="body2" gutterBottom>
                                {index + 1}
                            </Typography>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        <Card className="alert alert-info text-center">
                            <Typography variant="body2" gutterBottom>
                                {item.class_name}
                            </Typography>
                        </Card>
                    </Col>
                    <Col sm={2}>
                        <Card style={{cursor: "pointer"}} className="alert alert-info text-center" onClick={() =>
                                    location.href=`/class_result?examinaId=${classList.id}&classId=${item.id}`}>
                            <Typography variant="body2" gutterBottom>
                                View Result
                            </Typography>
                        </Card>
                    </Col>
                </Row>
                ))}
              </>
            )}
            {isObjectEmpty(classList) && (
                <Row className="d-flex justify-content-center">
                    <Col sm={8}>
                        <Card className="alert alert-danger text-center">
                            Sorry, No records found.
                        </Card>
                    </Col>
                </Row>
            )}
              </Container>
            </div>
          </section>
        </>
    )

};

export default ResultLanding;