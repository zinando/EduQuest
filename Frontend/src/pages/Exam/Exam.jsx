import { useState, useEffect } from 'react';
import '../../layout/Sidebar/SideBar.css';
import Sidebar from '../../layout/Sidebar/SideBar';
import Navbar from '../../layout/NavBar/NavBar';
import Paper from '@mui/material/Paper';
import CountdownTimer from '../../component/Timer/Timer';
import triangle from '../../assets/triangle.gif';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Row, Col, Modal, Container } from 'react-bootstrap';
import './exam.css';
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import queryBackEnd, { userInfo, checkUserPermission } from '../../pages/queryBackEnd';
import triggerProcessing, { showToast } from '../../pages/triggerProcessing';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const Exam = () => {
  const [showInstructions, setShowInstruction] = useState(true);
  const [instructions, setInstructions] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examClass, setExamClass] = useState('');
  const [examSubject, setExamSubject] = useState('');
  const [examDuration, setExamDuration] = useState(0);
  const [examinaId, setExaminaId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "In a right triangle, if one of the legs is 3 units long, and the hypotenuse is 5 units long, what is the length of the other leg?",
      diagram: triangle,
      answers: ["A. 2 units", "B. 3 units", "C. 4 units", "D. 6 units"],
      correctAnswer: ["B. 3 units"],
    },
    {
      id: 2,
      question: "If the radius of a circle is 6 centimeters, what is the area of the circle?",
      diagram: null,
      answers: ["A. 12 cm²", "B. 18 cm²", "C. 36 cm²", "D. 72 cm²"],
      correctAnswer: ["C. 36 cm²"],
    },
    {
      id: 3,
      question: "What is the result of 7 × 8 - 3²?",
      answers: ["A. 40", "B. 49", "C. 53", "D. 56"],
      correctAnswer: ["B. 49"],
    },
    {
      id: 4,
      question: "If the length of a rectangular garden is 12 meters and the width is 8 meters, what is the perimeter of the garden?",
      diagram: null,
      answers: ["A. 16 meters", "B. 32 meters", "C. 40 meters", "D. 48 meters"],
      correctAnswer: ["C. 40 meters"],
    },
    {
      id: 5,
      question: "What is the area of a triangle with a base of 10 centimeters and a height of 6 centimeters?",
      diagram: "[Insert diagram here]",
      answers: ["A. 15 cm²", "B. 30 cm²", "C. 45 cm²", "D. 60 cm²"],
      correctAnswer: ["B. 30 cm²"],
    },
  ]);

  const questionsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const [params] = useSearchParams();

useEffect(() => {
      fetchQuestion();
  }, []);

  const fetchQuestion = () => {
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'FETCH-STUDENT-EXAM-QUESTION';
    const data = {}; data.question_id = params.get('itemId');
    queryBackEnd(url, data, action)
        .then((response) => {
            let myList = questions;
            let myInstruction = instructions;
            let mySubject = examSubject;
            let myClass = examClass;
            let myTitle = examTitle;
            let myDuration = examDuration;
            let myStartTime = startTime; let myExaminaId = examinaId; let myQuestionId = questionId;
            if (response.status === 1){
                myList = response.data.content;
                myInstruction = response.data.instruction;
                myClass = response.data.klass;
                myTitle = response.data.title;
                mySubject = response.data.subject;
                myDuration = response.data.duration;
                myStartTime = response.data.start_time;
                myExaminaId = response.data.examina_id;
                myQuestionId = response.data.question_id;
            } else {
                console.log(response.error);
            }
            setExaminaId(myExaminaId);
            setQuestionId(myQuestionId);
            setStartTime(myStartTime);
            setQuestions(myList);
            setInstructions(myInstruction);
            setExamTitle(myTitle);
            setExamClass(myClass);
            setExamSubject(mySubject);
            setExamDuration(myDuration);
        });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

   const handleSelectAnswer = (selectedAnswer) => {
    if (!submitClicked) {
        if (currentPage in selectedAnswers){
            //current page exists, now check if item already exists in its value
            if (selectedAnswers[currentPage].includes(selectedAnswer)){
                //selected item is present, remove it
                selectedAnswers[currentPage].pop(selectedAnswer);
            } else {
                //selected item is not present, include it
                selectedAnswers[currentPage].push(selectedAnswer);
            }
        } else{
            //assign selected item to current page key
            setSelectedAnswers({
                ...selectedAnswers,
                [currentPage]: [selectedAnswer],
            });
        }
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question) => {
      const selected = selectedAnswers[question.id];
      //console.log(selected); console.log(question.correctAnswer);
      if (selected) {
        if (selected.length == question.correctAnswer.length && selected.every((answer) => question.correctAnswer.includes(answer))) {
            newScore += 1;
        }
      }
    });
    let scorePercent = 0;
    if (newScore > 0){
        scorePercent = ((newScore/questions.length)*100).toFixed(2);
    }
    setScore(scorePercent);
   return scorePercent;
  };

  const showQuestions = () => {
    setShowInstruction(false);
  };

  const toggleShowQuestions = () => {
    document.getElementById("exam-instruction-div").hidden = true;
    document.getElementById("exam-question-div").hidden = false;
  };

  const triggerWarning = async () => {
    Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'You are about to submit your answers, this action cannot be reversed for you if successful',
        showCancelButton: true,
        confirmButtonText: `Yes, Proceed.`,
        confirmButtonColor: "#ffcd6e"
    }).then((response) => {
        let mySubmitButtonClick = true;
        if (response.isConfirmed) {
            triggerProcessing();

            const examScore = calculateScore();
            const data = {};
            data.script = computeExamScript(examScore);
            data.examina_id = examinaId;
            data.question_id = questionId;

            //record exam score at database
            recordExamScore(data, "manual");
        }else{
            mySubmitButtonClick = false;
        }
        setSubmitClicked(mySubmitButtonClick);
    })
  };

  const computeExamScript = (examScore) => {
    const myScript = {};
            myScript.instruction = instructions;
            myScript.class = examClass;
            myScript.subject = examSubject;
            myScript.title = examTitle;
            myScript.score = examScore;
            myScript.start_time = startTime;
            myScript.duration = examDuration.toString() + " mins.";
            myScript.questions = questions;
            myScript.questions.forEach((question) => {
                question.remarks = "wrong";
                question.selectedAnswer = selectedAnswers[question.id];

                if (question.selectedAnswer) {
                    if (question.selectedAnswer.length == question.correctAnswer.length && question.selectedAnswer.every((answer) => question.correctAnswer.includes(answer))) {
                        question.remarks = "correct";
                    }
                }
            });
    return myScript;
  };

  const recordExamScore = (data, method = "autoRecord") => {
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'RECORD-EXAM-SCORE';
    queryBackEnd(url, data, action)
        .then((response) => {
            if (response.status === 1){
                if (method == "autoRecord"){
                    showToast('success', 'Automatic Submission', 'Your scores have been submitted automatically.')
                        .then((res) =>{
                        location.href = "/dashboard/"+userInfo().adminType;
                    });
                } else {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: response.message,
                    }).then((res) =>{
                        location.href = "/dashboard/"+userInfo().adminType;
                    });
                }
            } else {
                showToast('error', 'Error!', 'An error occurred while attempting to record your scores')
                        .then((res) =>{
                        console.log(response.error);
                        location.href = "/dashboard/"+userInfo().adminType;
                    });
            }
        });
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className='exam'>
            <ul>
              <li><h5>{"TITLE: " +examTitle}</h5></li>
              <li> <CountdownTimer duration={params.get('duration')} /></li>
              <li>{"SUBJECT: "+examSubject}</li>
              <li>{"CLASS: "+examClass}</li>
              {/*{submitClicked && <li>Score: {score}</li>}*/}
            </ul>
          </div>

          <Container id="exam-instruction-div">
            <Row className="justify-content-center">
                <Col sm={8}>
                    <div className="alert alert-info text-center">
                        <div><h3>General Instructions</h3></div>
                        <div>{instructions}</div>
                        <div> You have <CountdownTimer duration={params.get('duration')} hideTitle={true} /> </div>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={4}>
                    <Button variant="contained" color="primary" onClick={toggleShowQuestions}>
                        Continue...
                    </Button>
                </Col>
            </Row>

          </Container>

          <div id="exam-question-div" hidden={true}>
            <TableContainer component={Paper} style={{ boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)', borderRadius: '20px' }}>
              <Table aria-label="Math Questions Table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell><b>Question</b></TableCell>
                    {currentQuestions[0].diagram && <TableCell><b>Diagram</b></TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{currentQuestions[0].id.toString()+'/'+questions.length.toString()}</TableCell>
                    <TableCell>{currentQuestions[0].question}</TableCell>
                    {currentQuestions[0].diagram && (
                      <TableCell>
                        <img src={currentQuestions[0].diagram} alt={`Diagram for question ${currentQuestions[0].id}`} />
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
              <Table aria-label="Answers Table">
                <TableBody>
                  <TableRow>
                    <TableCell><b>Options</b></TableCell>
                    <TableCell>
                      <ul>
                        {currentQuestions[0].answers.map((answer, indx) => (
                          <li key={answer} style={{listStyleType: 'none'}}>
                            <span>{alpha[indx] +'. '}</span>
                            <Checkbox
                              value={answer}
                              onChange={() => handleSelectAnswer(answer)}
                              checked={selectedAnswers[currentPage]?.includes(answer)}
                              disabled={submitClicked}
                            />
                                <span>{answer}</span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {currentPage > 1 && !submitClicked && (
                <Button variant="contained" color="primary" onClick={handlePrevPage}>
                  Previous
                </Button>
              )}

              {currentPage < questions.length && !submitClicked && (
                <Button variant="contained" color="primary" onClick={handleNextPage} style={{ marginLeft: '10px' }}>
                  Next
                </Button>
              )}

              {currentPage == questions.length && !submitClicked && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSubmitClicked(true);
                    triggerWarning();
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Exam;
