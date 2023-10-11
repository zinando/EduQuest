import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Row, Col, Modal } from 'react-bootstrap';
import './ExamSubjects.scss';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import queryBackEnd, { userInfo } from '../../pages/queryBackEnd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import triggerProcessing from '../../pages/triggerProcessing';


const ExamSubjects = ({subjectList, classes}) => {
    const navigate = useNavigate();


  const toggleRequestButton = (status) => {
        if (status === 1){
            document.getElementById('requestButt').innerHTML = 'cancel request';
        } else {
            document.getElementById('requestButt').innerHTML = 'request review';
        }
  };

  const updateNotice = (statInfo, id) => {
    document.getElementById('notice-count-'+id).innerHTML = statInfo.question_count;
    document.getElementById('notice-request-'+id).innerHTML = statInfo.review_request;
    document.getElementById('notice-status-'+id).innerHTML = statInfo.review_status;
  };

  const makeUnique = (id1, id2) => {
    return id1.toString() + id2.toString();
  };

    // Handle request review
  const handleRequestReview = (subject_id, examina_id) => {
        triggerProcessing();
    const url = '/dashboard/'+ userInfo().adminType;
        const action = 'REQUEST-QUESTION-REVIEW';
        const data = {};
        data.subject_id = subject_id; data.examina_id = examina_id;
        const method = 'POST';

        // Fetch data from the backend
        queryBackEnd(url, data, action, method)
          .then((response) => {
                if (response.status === 1){
                    toggleRequestButton(response.data.request_status);
                    updateNotice(response.exam_stat, makeUnique(subject_id, examina_id));
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: response.message
                    });
                }

          })
          .catch((error) => console.error(error));
  };

    return (
            <>
                {subjectList.map((item) => (
                    <Row className="teacher-subject-row">
                        <Col sm={2}>{item.title}</Col>
                        <Col sm={2}>{classes.find((klass) => klass.id === item.klass)?.name}</Col>
                        <Col sm={4}>
                            <span className='exam-subject-notification-span sp-3' id={'notice-count-'+makeUnique(item.id, item.examina_id)}>{item.notification.question_count}</span><br/>
                            <span className='exam-subject-notification-span sp-3' id={'notice-request-'+makeUnique(item.id, item.examina_id)}>{item.notification.review_request}</span><br/>
                            <span className='exam-subject-notification-span sp-3' id={'notice-status-'+makeUnique(item.id, item.examina_id)}>{item.notification.review_status}</span>
                        </Col>
                        <Col sm={4}>
                            <Row>
                                <Col sm={6} onClick={()=>navigate({
                                        pathname:"/set_question",
                                        search: createSearchParams({examId:item.examina_id, subjectId:item.id}).toString()
                                    })}>
                                     <span className='exam-subject-span sp-1'>set question</span>
                                </Col>
                                <Col sm={6}>
                                    <span className='exam-subject-span sp-2' id='requestButt' onClick={() => handleRequestReview(item.id, item.examina_id)}>
                                        request review
                                    </span>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                ))}
            </>


    );

};

export default ExamSubjects;