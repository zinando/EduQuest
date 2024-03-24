import { useState, useEffect } from 'react';
import '../../layout/Sidebar/SideBar.css';
import Sidebar from '../../layout/Sidebar/SideBar';
import Navbar from '../../layout/NavBar/NavBar';
import CountdownTimer from '../../component/Timer/Timer';
import TimedButton from '../../component/Timer/TimedButton';
import {Button, Table, Row, Col, Modal, Container } from 'react-bootstrap';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import queryBackEnd, { userInfo, checkUserPermission } from '../../pages/queryBackEnd';
import { calculateTimeDifference } from '../../pages/triggerProcessing';

const ExamLandingPage = () => {
    const navigate = useNavigate();
    const [examList, setExamList] = useState([]);

useEffect(() => {
    checkUserPermission('TAKE-EXAM');
    fetchTodayPapers();

}, []);

const fetchTodayPapers = () => {
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'FETCH-TODAY-EXAMS';
    const data = {};
    queryBackEnd(url, data, action)
        .then((response) => {
            let myList = examList;
            if (response.status === 1){
                myList = response.data;
            } else {
                console.log(response.error);
            }
            setExamList(myList);
        });
};


    if (examList.length === 0)
    {
    return (
        <>
            <Sidebar />
            <section className="home-section">
                <Navbar />
                <div className="home-content">
                    <div className="alert alert-danger text-center" style={{top: '350px'}}>You do not have exams today. Enjoy!</div>
                </div>
            </section>
        </>
    )}
    return (
        <>
            <Sidebar />
            <section className="home-section">
                <Navbar />
                <div className="home-content">
                    <Container>
                        <Row>
                            <Col>
                                <h3>Today's Papers</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Title</th>
                                        <th>Subject</th>
                                        <th>Exam Schedule</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {examList.map((item, indx) => (

                                    <tr key={item.id}>
                                        <td>{indx + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.subject}</td>
                                        <td>
                                            <div>{item.start_time} - {item.end_time}</div>
                                            <CountdownTimer duration={item.time_remaining} hideTitle={false} />
                                        </td>

                                        <td>
                                            {/*<TimedButton data={{itemId:item.id, duration: item.duration}} wait={item.time_remaining!=0}
                                                timeRemaining={item.time_remaining} />*/}
                                            <Button variant="success" className="custom-button" onClick={()=> navigate({
                                                    pathname:"/exam_landing/exam",
                                                search: createSearchParams({itemId:item.id, duration: item.duration}).toString()
                                                })} disabled={item.time_remaining !=0 || item.written_exam == 'yes'}>
                                                Start
                                            </Button>
                                            { item.written_exam == 'yes' && (
                                                <div style={{color: 'red', fontStyle: 'italic', fontSize: '9px'}}> you have written this paper</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                </div>
            </section>
        </>
    )

};

export default ExamLandingPage;