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


const ReviewExamResults = () => {
    const [resultData, setResultData] = useState([]);
    const [questionData, setQuestionData] = useState({});
    const [resultSummary, setResultSummary] = useState({});
    const [showActionModal, setShowActionModal] = useState(false);
    const [showScriptModal, setShowScriptModal] = useState(false);
    const [comment, setComment] = useState(' ');
    const [selectedItem, setSelectedItem] = useState({});
    const [skript, setSkript] = useState({});
    const [questions, setQuestions] = useState([]);
    const [classResultId, setClassResultId] = useState(0);
    const [approvalStatus, setApprovalStatus] = useState('');
    const [params] = useSearchParams();


useEffect(() => {
    checkUserPermission('REVIEW_RESULTS');
    fetchResultData();

}, [] );

const handleShowExamScript = (script, studentName) => {
    let correct = 0; let wrong = 0;
    script.questions.forEach((question) => {
        if (question.remarks == 'correct')
        {
            correct += 1;
        } else {
            wrong += 1;
        }
    });
    setSelectedItem({studentName: studentName,
                    totalQuestions: script.questions.length,
                    wrong: wrong,
                    correct: correct,
    });
    setSkript(script);
    setQuestions(script.questions);
    console.log(script.questions);
    setShowScriptModal(true);
};

const handleCloseScriptModal = () => {
    setSelectedItem({});
    setSkript({});
    setShowScriptModal(false);
};

const handleCloseActionModal = () => {
    setShowActionModal(false);
};

const fetchResultData = () => {
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'FETCH-RESULT-FOR-REVIEW';
    const data = {};
    data.examina_id = params.get("examId"); data.subject_id = params.get("subjectId");
    queryBackEnd(url, data, action)
    .then((response) => {
        let myResultData = resultData; let myQuestionData = questionData;
        let mySummary = resultSummary; let myId = classResultId; let myStatus = approvalStatus;
        if (response.status === 1) {
            myResultData = response.data.result_list;  myQuestionData = response.data.exam_info;
            mySummary = response.data.result_summary;  myId = response.data.id;
            myStatus = response.data.status;

        } else {
            console.log(response.message);
            console.log(response.error);
        }
        setApprovalStatus(myStatus);
        setClassResultId(myId);
        setQuestionData(myQuestionData);
        setResultData(myResultData);
        setResultSummary(mySummary);
    })
};

const takeAction = (action) => {
    //ensure user provides a comment if they are rejecting the result
    if (action === "reject" && comment.length < 10){
        const text = 'Please provide elaborate comment on why you are rejecting the result.';
        const icon = 'error';
        const title = 'Empty Required Field';
        showToast(icon, title, text);
        return false;
    }

    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: `You are about to ${action} this result.`,
        showCancelButton: true,
        confirmButtonText: `Yes, ${action}.`,
        confirmButtonColor: "#ffcd6e"
    }).then((value) => {
        if (value.isConfirmed) {
            triggerProcessing();
            const data = {}; //question data
            data.classResultId = classResultId;
            data.comment = comment;
            data.action = action;

            if (data.classResultId){
                 // query backEnd
                const url = '/dashboard/'+userInfo().adminType;
                const action = 'REVIEW-RESULT';
                queryBackEnd(url, data, action)
                    .then((response) => {
                        if (response.status === 1){
                            handleCloseActionModal();
                            Swal.fire({
                                title: 'Success',
                                icon: 'success',
                                text: response.message,
                            }).then((res) =>{
                                location.href = "/dashboard/"+userInfo().adminType;
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
                    const text = "Class Result ID is missing.";
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
                    <Col sm={12}>
                        <h3>RESULT REVIEW</h3>
                    </Col>
                </Row>
                {/* exam details*/}
                {!isObjectEmpty(questionData) && (
                <Row className="justify-content-center" >

                    <Col sm={6}>
                        <Row>
                            <Col sm={3}>
                                <h5>Exam Title:</h5>
                            </Col>
                            <Col sm={9}>
                                <p>{questionData.title}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3}>
                        <Row>
                            <Col sm={6}>
                                <h5>Subject: </h5>
                            </Col>
                            <Col sm={6}>
                                <p>{questionData.subject}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3}>
                        <Row>
                            <Col sm={6}>
                                <h5>Class: </h5>
                            </Col>
                            <Col sm={6}>
                                <p>{questionData.class}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                )}
                {/* result summary */}
                {!isObjectEmpty(resultSummary) && (
                <Row className="justify-content-center" style={{marginTop: '15px'}}>
                    <Col sm={6} style={{backgroundColor: 'yellow', paddingTop: '10px'}}>
                        <Row>
                            <Col sm={10}>
                                <h5>Participants: </h5>
                            </Col>
                            <Col sm={2}>
                                <p>{resultSummary.participants}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3} style={{backgroundColor: 'orange', paddingTop: '10px'}}>
                        <Row>
                            <Col sm={10}>
                                <h5>Passed: </h5>
                            </Col>
                            <Col sm={2}>
                                <p>{resultSummary.passed}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={3} style={{backgroundColor: 'red', paddingTop: '10px'}}>
                        <Row>
                            <Col sm={6}>
                                <h5>Failed: </h5>
                            </Col>
                            <Col sm={6}>
                                <p>{resultSummary.failed}</p>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                )}
                {/* action */}
                <Row className="justify-content-center" >
                  <Col sm={12}>
                    <hr style={{border:"2px solid red"}}/>
                  </Col>
                  <Col sm={12} className="justify-content-center">
                     <Row>
                        <Col sm={4} style={{marginTop: "10px"}}>
                            <Row>
                                <Col sm={6}><h5>Approval Status:</h5></Col>
                                <Col sm={6}>
                                    {approvalStatus == "pending" && (
                                        <span style={{borderRadius: "10px", padding: "5px", backgroundColor: "#ffcd6e"}}>{approvalStatus}</span>
                                    )}
                                    {approvalStatus == "approved" && (
                                        <span style={{borderRadius: "10px", padding: "5px", backgroundColor: "green"}}>{approvalStatus}</span>
                                    )}
                                    {approvalStatus == "rejected" && (
                                        <span style={{borderRadius: "10px", padding: "5px", backgroundColor: "#e97463"}}>{approvalStatus}</span>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Button variant="info" type="button" onClick={() => setShowActionModal(true)}
                            disabled={approvalStatus != "pending"}>Take Action</Button>
                        </Col>
                        <Col sm={4}>
                            <Link to={"/dashboard/"+userInfo().adminType}><Button variant="success" type="button">Back To Dashboard</Button></Link>
                        </Col>
                     </Row>
                  </Col>
                  {/* horizontal rule */}
                  <Col sm={12} >
                    <hr style={{border:"2px solid red"}}/>
                  </Col>
                </Row>
                {/* student result list */}
                <Row className="justify-content-center" >
                    <Table className="custom-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Score</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultData.map((item, indx) => (
                            <tr key={item.id}>
                                <td>{indx + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.class}</td>
                                <td>{item.score}</td>
                                <td>
                                {item.remarks == 'passed' && (
                                    <span style={{ padding: '5px', color: '#000000', backgroundColor: 'green',
                                       marginLeft: '70px', borderRadius: '5px' }}>
                                        {item.remarks}
                                    </span>
                                )}
                                {item.remarks == 'failed' && (
                                    <span style={{ padding: '5px', color: '#000000', backgroundColor: 'red',
                                       marginLeft: '70px', borderRadius: '5px' }}>
                                            {item.remarks}
                                    </span>
                                )}
                                </td>
                                <td>
                                    <Button variant="contained" color="primary" onClick={() => handleShowExamScript(item.script, item.name)}
                                        style={{ marginLeft: '10px' }}>
                                            view script
                                    </Button>
                                </td>
                            </tr>
                            ))}

                        </tbody>
                    </Table>

                </Row>
            </Container>

            {/* Action Modal */}
            <Modal show={showActionModal} onHide={handleCloseActionModal}>
              <Modal.Header closeButton>
                <Modal.Title>Approve or Reject Exam Result</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group  as={Row}>
                    <Col sm={12}>
                      <Form.Label >Add comment <small style={{color: 'red'}}>(required if result is being rejcted.)</small></Form.Label>
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
                          Approve Result
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button variant="danger" onClick={() => takeAction('reject')}>
                          Reject Result
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

            {/* View Script Modal */}
            <Modal show={showScriptModal} onHide={handleCloseScriptModal} className="modal-lg">
              <Modal.Header className="text-center d-block" >
                <Modal.Title className="text-center" style={{color: '#e97463'}}>
                            EXAMINATION SCRIPT
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                    <Col sm={12}>
                            <h3 style={{color: '#0b88b3'}}>{selectedItem.studentName}</h3>
                        </Col>
                    <Row>
                        <Col sm={3}>
                            <Row>
                                <Col sm={4}>
                                    <h5>Title:</h5>
                                </Col>
                                <Col sm={8}>
                                    <p>{skript.title}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={5}>
                                    <h5>Subject:</h5>
                                </Col>
                                <Col sm={7}>
                                    <p>{skript.subject}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={5}>
                                    <h5>Class:</h5>
                                </Col>
                                <Col sm={7}>
                                    <p>{skript.class}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={6}>
                                    <h5>Duration:</h5>
                                </Col>
                                <Col sm={6}>
                                    <p>{skript.duration}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <Row>
                                <Col sm={8}>
                                    <h5>#Questions:</h5>
                                </Col>
                                <Col sm={4}>
                                    <p>{selectedItem.totalQuestions}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={10}>
                                    <h5>Correct Ans:</h5>
                                </Col>
                                <Col sm={2}>
                                    <p>{selectedItem.correct}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={10}>
                                    <h5>Wrong Ans:</h5>
                                </Col>
                                <Col sm={2}>
                                    <p>{selectedItem.wrong}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3}>
                            <Row>
                                <Col sm={8}>
                                    <h5>Score:</h5>
                                </Col>
                                <Col sm={4}>
                                    <p>{skript.score}%</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12}>
                            <Row>
                                <Col sm={2}>
                                    <h5>Instruction:</h5>
                                </Col>
                                <Col sm={10}>
                                    <p>{skript.instruction}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} >
                            <hr style={{border:"2px solid #e97463"}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th><b>S/N</b></th>
                                    <th><b>Question</b></th>
                                    <th><b>Options</b></th>
                                    <th><b>Selected Option</b></th>
                                    <th><b>Remarks</b></th>
                                    <th><b>Correct Option</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, indx) => (
                                    <tr key={question.id}>
                                        <td>{indx + 1}</td>
                                        <td>{question.question}</td>
                                        <td>
                                            {question.answers.map((option) => (
                                                <div>- {option}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {question.selectedAnswer.map((ans) => (
                                                <div>{ans}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {question.remarks == 'correct' && (
                                                <span style={{ padding: '5px', color: '#000000', backgroundColor: 'green',
                                                   marginLeft: '70px', borderRadius: '5px' }}>
                                                    {question.remarks}
                                                </span>
                                            )}
                                            {question.remarks == 'wrong' && (
                                                <span style={{ padding: '5px', color: '#000000', backgroundColor: 'red',
                                                   marginLeft: '70px', borderRadius: '5px' }}>
                                                        {question.remarks}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {question.correctAnswer.map((ans) => (
                                                <div>{ans}</div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseScriptModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
           </div>
         </section>
    </>
);
};

export default ReviewExamResults;