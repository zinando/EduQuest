import { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Table, Row, Col, Modal, Container} from 'react-bootstrap';
import icons from '../../assets/large logo.png'
import queryBackEnd, { userInfo, isObjectEmpty } from '../../pages/queryBackEnd';

const LogoCardList = ({stat = {}, content = []}) => {
    const [showScriptModal, setShowScriptModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [skript, setSkript] = useState({});
    const [questions, setQuestions] = useState([]);
    const [resultStat, setResultStat] = useState(stat);

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

  return (
  <>
    <Container >
        <Row>
            <Col sm={12} >
                <Card style={{maxHeight: "140px"}}>
                    <img src={icons} style={{maxHeight: "140px"}} />
                </Card>
            </Col>
        </Row>
        <Row className="d-flex justify-content-center" style={{margin: "2px 2px"}}>
            <Col sm={6}>
                <Card className="text-center" style={{backgroundColor: "#0b88b3",
                    color: "#ffffff", paddingTop: "5px", fontWeight: "bolder"}}>
                    <Typography variant="h5" gutterBottom style={{fontWeight: "bolder"}}>
                      STUDENT EXAM REPORT CARD
                    </Typography>
                </Card>
            </Col>
        </Row>
        {!isObjectEmpty(stat) && (
        <Row className="" >
            <Col sm={5}>
                <Card className="">
                    <Row style={{padding: "5px"}}>
                        <Col sm={5}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Student Name:
                            </Typography>
                        </Col>
                        <Col sm={7}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.student_name}
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={5}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Student Class:
                            </Typography>
                        </Col>
                        <Col sm={7}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.student_class}
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={5}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Class Count:
                            </Typography>
                        </Col>
                        <Col sm={7}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.class_count}
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={5}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Class Rank:
                            </Typography>
                        </Col>
                        <Col sm={7}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.class_rank}
                            </Typography>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col sm={1}>
            </Col>
            <Col sm={6}>
                <Card className="">
                    <Row style={{padding: "5px"}}>
                        <Col sm={4}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Exam Title:
                            </Typography>
                        </Col>
                        <Col sm={8}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.title}
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={4}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Subject Count:
                            </Typography>
                        </Col>
                        <Col sm={8}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.subject_count}
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={4}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Average Score:
                            </Typography>
                        </Col>
                        <Col sm={8}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.average_score.toFixed(2)}%
                            </Typography>
                        </Col>
                    </Row>
                    <Row style={{padding: "5px"}}>
                        <Col sm={4}>
                            <Typography variant="h6" gutterBottom style={{color: "#0b88b3"}}>
                              Remarks:
                            </Typography>
                        </Col>
                        <Col sm={8}>
                            <Typography variant="body1" gutterBottom style={{marginTop: "5px"}}>
                              {stat.remarks}
                            </Typography>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        )}
        {/*<Row className="d-flex justify-content-center" style={{margin: "2px 2px"}}>
            <Col sm={3}>
                <Card className="text-center" style={{backgroundColor: "#000000",
                    color: "#ffffff", paddingTop: "5px", fontWeight: "bolder"}}>
                    <Typography variant="h5" gutterBottom style={{fontWeight: "bold"}}>
                      Result Details
                    </Typography>
                </Card>
            </Col>
        </Row> */}
        <Row>
        {content.length > 0 && (
            <Table className="custom-table">
                <thead>
                    <tr>
                        <th className="text-center">Subject</th>
                        <th className="text-center">Score</th>
                        <th className="text-center">Remarks</th>
                        <th className="text-center">Rank</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                {content.map((item, index) => (
                    <tr key={index}>
                        <td>
                        <Card style={{ padding: '5px 0px 0px 15px', minWidth: '250px', minHeight: "31px" }}>
                            {item.subject}
                        </Card>
                        </td>
                        <td>
                            <Card className="text-center" style={{paddingTop: '5px', minWidth: '150px', minHeight: "31px" }}>
                                {item.score}%
                            </Card>
                        </td>
                        <td>
                            <Card className="text-center" style={{ paddingTop: '5px', minWidth: '150px' , minHeight: "31px"}}>
                                {item.remarks}
                            </Card>
                        </td>
                        <td>
                            <Card className="text-center" style={{ paddingTop: '5px', minWidth: '150px' , minHeight: "31px"}}>
                                {item.subject_rank}
                            </Card>
                        </td>
                        <td>
                            <Card className="d-flex justify-content-center" style={{ margin: '0px', maxWidth: '105px' }}>
                                <Button size="small" color="primary" onClick={()=> handleShowExamScript(item.script, stat.student_name)}>
                                    View Script
                                </Button>
                            </Card>
                        </td>
                    </tr>
                ))}
                </tbody>
             </Table>
        )}
        </Row>
    </Container>

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
  </>
  );
};

export default LogoCardList;
