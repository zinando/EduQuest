import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Row, Col, Modal } from 'react-bootstrap';
import './ExamSubjects.scss';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';


const ExamSubjects = ({subjectList, classes}) => {
    const navigate = useNavigate();

    return (
            <>
                {subjectList.map((item) => (
                    <Row>
                        <Col sm={2}>{item.title}</Col>
                        <Col sm={2}>{classes.find((klass) => klass.id === item.klass)?.name}</Col>
                        <Col sm={2}>
                            <div>review requested</div>
                            <div>pending approval</div>
                        </Col>
                        <Col sm={6}>
                            <Row>
                                <Col sm={4} onClick={()=>navigate({
                                        pathname:"/set_question",
                                        search: createSearchParams({examId:item.examina_id, subjectId:item.id}).toString()
                                    })}>
                                     <span className='exam-subject-span sp-1'>Set Question</span>
                                </Col>
                                <Col sm={4}><span className='exam-subject-span sp-2'>Request Review</span></Col>
                                <Col sm={4}><span className='exam-subject-span sp-3'>View Questions</span></Col>
                            </Row>
                        </Col>
                    </Row>
                ))}
            </>


    );

};

export default ExamSubjects;