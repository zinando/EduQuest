import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import queryBackEnd, { userInfo, isObjectEmpty, checkUserPermission, logOutUser } from '../queryBackEnd';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../component/Multiselect/multiselectdropdown.scss';
import {Button, Table, Row, Col, Modal, Form } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar/SideBar';
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../Dashboard/Home.css';
import triggerProcessing, { showToast } from '../triggerProcessing';
import '../../component/Item/Item.scss';
import './SetQuestions.scss'


const ReviewExamQuestions = () => {
    const [questionData, setQuestionData] = useState({id: 2, content: [{question: '',
    question_type: '', answer: [], options: [], image_url: ''}]
    });
    const [showActionModal, setShowActionModal] = useState(false);
    const [comment, setComment] = useState(' ');
    const [params] = useSearchParams();


useEffect(() => {
    checkUserPermission('SET_QUESTIONS');
    setQuestionData(JSON.parse(params.get("item")));
    //console.log(JSON.parse(params.get("item")));
}, [] );

const handleCloseActionModal = () => {
    setShowActionModal(false);
};

const takeAction = (action) => {
    //ensure user provides a comment if they are rejecting the question
    if (action === "reject" && comment.length < 10){
        const text = 'Please provide elaborate comment on why you are rejecting the question.';
        const icon = 'error';
        const title = 'Empty Required Field';
        showToast(icon, title, text);
        return false;
    }

    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: `You are about to ${action} this question.`,
        showCancelButton: true,
        confirmButtonText: `Yes, ${action}.`,
        confirmButtonColor: "#ffcd6e"
    }).then((value) => {
        if (value.isConfirmed) {
            triggerProcessing();
            const data = {}; //question data
            data.question_id = JSON.parse(params.get('item')).id;
            data.comment = comment;
            data.action = action;

            if (data.question_id){
                 // query backEnd
                const url = '/dashboard/'+userInfo().adminType;
                const action = 'REVIEW-QUESTION';
                queryBackEnd(url, data, action)
                    .then((response) => {
                        if (response.status === 1){
                            handleCloseActionModal();
                            Swal.fire({
                                title: 'Success',
                                icon: 'success',
                                text: response.message,
                            }).then((res) =>{
                                location.href = "/dashboard/reviewer";
                            });
                        } else {
                            Swal.fire({
                                title: 'Error',
                                icon: 'error',
                                text: response.message,
                            });
                            console.log(response.error);
                        }
                    });

            } else {
                    const title = 'Empty Fields';
                    const icon = "error";
                    const text = "Question ID is missing.";
                    showToast(icon, title, text);
            }
        }
    });
};

return (
    <>
         <Sidebar />
         <section className="home-section">
           <Navbar />
           <div className="home-content">
             <Container>
                <Row className="justify-content-center">
                    <Col sm={6}>
                        <h3>Reviewing Exam Questions for</h3>
                    </Col>
                    <Col sm={12} className="justify-content-center">
                      <Row>
                        <Col sm={6}><h5>Subject: </h5><span>{questionData.subject}</span></Col> <Col sm={6}><h5> Class: </h5><span>{questionData.klass}</span></Col>
                      </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col sm={12}>
                    <hr style={{border:"2px solid red"}}/>
                  </Col>
                  <Col sm={12} className="justify-content-center">
                     <Row>
                        <Col sm={6}>
                            <Button variant="info" type="button" onClick={() => setShowActionModal(true)}>Take Action</Button>
                        </Col>
                        <Col sm={6}>
                            <Link to="/dashboard/reviewer"><Button variant="success" type="button">Back To Dashboard</Button></Link>
                        </Col>
                     </Row>
                  </Col>
                  <Col sm={12}>
                    <hr style={{border:"2px solid red"}}/>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                    <Table className="custom-table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Question</th>
                                <th>Options</th>
                                <th>Question Type</th>
                            </tr>
                        </thead>
                        <tbody>
                        { questionData.content.map((item, index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.question}</td>
                                <td>
                                {item.options.map(opt =>
                                    <div>{opt}</div>
                                )}
                                </td>
                                <td>{item.question_type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                </Row>
            </Container>

            {/* Action Modal */}
            <Modal show={showActionModal} onHide={handleCloseActionModal}>
              <Modal.Header closeButton>
                <Modal.Title>Approve or Reject Exam Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group  as={Row}>
                    <Col sm={12}>
                      <Form.Label >Add comment <small style={{color: 'red'}}>(required if question is being disapproved.)</small></Form.Label>
                      <textarea
                        rows={3}
                        cols={55}
                        value={comment}
                        placeholder="provide clarification for rejecting the question..."
                        onChange={e => setComment(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group  as={Row} style={{marginTop: "20px"}}>
                    <Col sm={6}>
                      <Button variant="success" onClick={() => takeAction('approve')}>
                          Approve Question
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button variant="danger" onClick={() => takeAction('reject')}>
                          Disapprove Question
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseActionModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
           </div>
         </section>
    </>
);
};

export default ReviewExamQuestions;