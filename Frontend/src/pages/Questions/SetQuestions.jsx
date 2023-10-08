import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import queryBackEnd, { userInfo, isObjectEmpty, checkUserPermission, logOutUser } from '../queryBackEnd';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import MultiSelectDropdown from '../../component/Multiselect/Multiselect';
import '../../component/Multiselect/multiselectdropdown.scss';
import {Button, Table, Row, Col, Modal } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar/SideBar';
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../Dashboard/Home.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import triggerProcessing from '../triggerProcessing';
import '../../component/Item/Item.scss';

const SetExamQuestions = () => {
    const [questionData, setQuestionData] = useState({id: 2, content: [{question: '',
    question_type: '', answer: [], options: [], image_url: ''}]
    });
    const [subjectData, setSubjectData] = useState({title:'',class_name:''});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [updatedEndDate, setUpdatedEndDate] = useState(null);
    const [instruction, setInstruction] = useState(" ");
    const [examQuestion, setExamQuestion] = useState(" ");
    const [options, setOptions] = useState("");
    const [optionsList, setOptionsList] = useState([{id: '', name: ''}]);
    const [image, setImage] = useState(null);
    const [answer, setAnswer] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [questionType, setQuestionType] = useState(null);
    const [question] = useSearchParams();
    const count = 0;


useEffect(() => {
    checkUserPermission('SET_QUESTIONS');
    handleSetQuestion(question.get('subjectId'), question.get('examId'));

}, [] );

//set selected options from the multiselectdropdowns
   const toggleAnswerOption = ({ id }) => {
        //document.getElementById("options").addEventListener("blurr", processOptions);
        setSelectedAnswer(prevSelectedAnswer => {
            // if it's in, remove
            const newArray = [...prevSelectedAnswer]
            if (newArray.includes(id)) {
                return newArray.filter(item => item != id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        })
   };

const processOptions = (value) => {
    setQuestionType(value);
    //process options as array of objects
    let OptionsList; let OptionsArr; let arr = optionsList;
    if (options == null || options==' '){
        Swal.fire({
            icon: 'warning',
            title: 'Alert!',
            text: 'Please fill the options field.'
        });
    } else{
        OptionsArr = options.split(';'); arr = [];
        for (var i=0; i<OptionsArr.length;i++){
            let obj={};
            obj.id = OptionsArr[i];
            obj.name = OptionsArr[i];
            arr.push(obj);
        }
    }
    setOptionsList(arr);
};

const handleSetQuestion = (subjectId, examId) => {
    const req_data = {};
    req_data.exam_id = examId; req_data.subject_id = subjectId;
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'FETCH-QUESTIONS';
    var questionDATA = questionData;
    var subjectDATA = subjectData;
    queryBackEnd(url, req_data, action).then((response) => {

        if (response.status === 1){
            // console.log('response came');

            if (!isObjectEmpty(response.data)){
                subjectDATA = response.data.subject_data;

                if (!isObjectEmpty(response.data.question_data)){
                    questionDATA = response.data.question_data;
                    console.log(response.data.question_data);
                }
            } else {
                console.log('response data is empty');
            }
        } else{
            console.log('Nothing here');
        }
        setQuestionData(questionDATA);
        setSubjectData(subjectDATA);
    });


  };

//change minimum endDate when user selects startDate so endDate is not below startDate
  const handleNewStartDate = (newDate) => {
        setStartDate(newDate);
        let prevEndDate = endDate;
        if (newDate > endDate){
            prevEndDate = newDate;
        }
        setEndDate(prevEndDate);
  };

const handleShowSettingsModal = () => {
    setEndDate(startDate);
    setShowSettingsModal(true);
  };

const handleCloseSettingsModal = () => {
    let prevEndDate = startDate;
    if (updatedEndDate != null){
        prevEndDate = updatedEndDate;
    }
    setEndDate(prevEndDate);
    setShowSettingsModal(false);
  };

const addSettingsHandler = () => {
    const data = {};
    data.start_date = startDate.toLocaleString('en-GB');
    data.end_date = endDate.toLocaleString('en-GB');
    data.examina_id = question.get('examId');
    data.subject_id = question.get('subjectId');
    data.instruction = instruction;

    if (data.start_date && data.end_date){
         // query backend
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'UPDATE-QUESTION-SETTINGS';

        queryBackEnd(url, data, action)
        .then((response) => {
            let start = startDate;
            let end = endDate;
            if (response.status === 1){
                let st = response.data.start; //start time info
                let et = response.data.end; //end time info
                start = new Date(st.yea, st.mon, st.day, st.hou, st.min, st.sec);
                end = new Date(et.yea, et.mon, et.day, et.hou, et.min, et.sec);
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: response.message,
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: response.message,
                });
                console.log(response.error);
            }
            console.log(start);
            setStartDate(start);
            setEndDate(end);
        });

    } else {
        Swal.fire({
            title: 'Empty Fields',
            icon: "error",
            text: "Some important fields are empty",
        })
    }
};

const handleCloseAddModal = () => {
    setShowAddModal(false);
};

const handleShowAddModal = () => {
    setShowAddModal(true);
};

const addQuestionsHandler = () => {
    triggerProcessing();

    const data = {}; //question data
    data.question = examQuestion;
    data.question_type = questionType;
    data.options = options.split(";");
    data.answer = selectedAnswer;
    data.examina_id = question.get('examId');
    data.subject_id = question.get('subjectId');
    console.log(data);

    if (data.question && data.question_type && data.options && data.answer){
         // query queryBackEnd
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'ADD-EXAM-QUESTION';

        let res_data = questionData;
        queryBackEnd(url, data, action)
        .then((response) => {
            if (response.status === 1){
                //fetch resources, refresh page
                res_data = response.data['question_data'];
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: response.message,
                });
                //location.reload();
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: response.message,
                });
                console.log(response.error);
            }
            setQuestionData(res_data);
            location.reload();
        });


    } else {
        Swal.fire({
            title: 'Empty Fields',
            icon: "error",
            text: "Some important fields are empty",
        })
    }
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
                        <h3>Setting Questions for</h3>
                    </Col>
                    <Col sm={12} className="justify-content-center">
                      <Row>
                        <Col sm={6}><h5>Subject: </h5><span>{subjectData.title}</span></Col> <Col sm={6}><h5> Class: </h5><span>{subjectData.class_name}</span></Col>
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
                            <Button variant="info" type="button" onClick={handleShowAddModal}>Add Question</Button>
                        </Col>
                        <Col sm={6}>
                            <Button variant="success" type="button" onClick={handleShowSettingsModal}>Exam Settings</Button>
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
                                <th>Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                        { questionData.content.map(item => (
                            <tr>
                                <td>{count +1 }</td>
                                <td>{item.question}</td>
                                <td>{item.options}</td>
                                <td>{item.question_type}</td>
                                <td>{item.answer}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                </Row>
            </Container>

            {/* Exam Settings Modal */}
            <Modal show={showSettingsModal} onHide={handleCloseSettingsModal}>
              <Modal.Header closeButton>
                <Modal.Title>Update Exam Settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group  as={Row}>
                    <Col sm={6}>
                      <Form.Label >Start Time</Form.Label>
                      <DatePicker showTimeSelect dateFormat="yyyy-MM-dd HH:mm" selected={startDate} selectsStart startDate={startDate} endDate={endDate} minDate={new Date()} minTime={new Date(0, 0, 0, 0, 0)} maxTime={new Date(0, 0, 0, 23, 59)} onChange={date => handleNewStartDate(date)} />
                    </Col>
                    <Col sm={6}>
                      <Form.Label >End Time</Form.Label>
                      <DatePicker showTimeSelect dateFormat="yyyy-MM-dd HH:mm" selected={endDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate}  minTime={new Date(0, 0, 0, 0, 0)} maxTime={new Date(0, 0, 0, 23, 59)} onChange={date => {setEndDate(date); setUpdatedEndDate(date)}} />
                    </Col>
                  </Form.Group>

                  <Form.Group  as={Row} style={{marginTop: "20px"}}>
                    <Col sm={12}>
                      <Form.Label >General Instructions</Form.Label>
                      <textarea
                        rows={6}
                        cols={55}
                        value={instruction}
                        onChange={e => setInstruction(e.target.value)}
                      />
                    </Col>

                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSettingsModal}>
                  Close
                </Button>
                <Button variant="warning" onClick={addSettingsHandler}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Add Exam Question Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Exam Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group  as={Row}>
                    <Col sm={12}>
                      <Form.Label >Question</Form.Label>
                      <textarea
                        rows={3}
                        cols={55}
                        value={examQuestion}
                        required={true}
                        placeholder="type your question here..."
                        onChange={e => setExamQuestion(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group  as={Row} style={{marginTop: "20px"}}>
                    <Col sm={12}>
                      <Form.Label >Options <small style={{color: "red"}}>separate each option by a semi-colon (;)</small></Form.Label>
                      <textarea
                        id="options"
                        rows={5}
                        cols={55}
                        value={options}
                        onChange={e => setOptions(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group  as={Row} style={{marginTop: "20px"}}>
                    <Col sm={12}>
                      <Form.Label >Number of Correct Options</Form.Label>
                      <select
                        className="form-control"
                        required={true}
                        value={questionType}
                        onChange={e => {processOptions(e.target.value);
                        }}
                      >
                        <option>Select Menu</option>
                        <option value="radio">Single Option</option>
                        <option value="checkbox">Multiple Options</option>
                      </select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" style={{marginTop: "30px"}}>
                      <Form.Label >
                        Select the correct answer(s) to this question
                        <MultiSelectDropdown options={optionsList} selected={selectedAnswer} toggleOption={toggleAnswerOption} title="name" />
                      </Form.Label>
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="warning" onClick={addQuestionsHandler}>
                  Add Question
                </Button>
              </Modal.Footer>
            </Modal>

           </div>
         </section>
    </>
);
};

export default SetExamQuestions;