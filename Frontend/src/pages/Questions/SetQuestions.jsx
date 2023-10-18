import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
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
import './SetQuestions.scss'

const SetExamQuestions = () => {
    const [questionData, setQuestionData] = useState({id: 2, content: [{question: '',
            question_type: '', answer: [], options: [], image_url: ''}]
    });
    //const [questionData, setQuestionData] = useState([]);
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
    const [editQuestion, setEditQuestion] = useState("");
    const [editOptions, setEditOptions] = useState(' ');
    const [editSelectedAnswer, setEditSelectedAnswer] = useState([]);
    const [editQuestionType, setEditQuestionType] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState(null);
    const [settingsLogged, setSettingsLogged] = useState(false);


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

   //set selected options from the multiselectdropdowns
   const toggleAnswerOption2 = ({ id }) => {

        setEditSelectedAnswer(prevEditSelectedAnswer => {
            // if it's in, remove
            const newArray = [...prevEditSelectedAnswer]
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
    setOptions(value);
    //process options as array of objects
    let OptionsList; let OptionsArr; let arr = optionsList;
    OptionsArr = value.split(';'); arr = [];
    for (var i=0; i<OptionsArr.length;i++){
        let obj={};
        obj.id = OptionsArr[i].trim();
        obj.name = OptionsArr[i].trim();
        arr.push(obj);
    }
    setOptionsList(arr);
};

const processEditOptions = (options) => {
    setEditOptions(options);
    //process options as array of objects
    let OptionsArr; let arr = [];
    if (options == null || options==' '){
        Swal.fire({
            icon: 'warning',
            title: 'Alert!',
            text: 'Please fill the options field.'
        });
    } else{
        OptionsArr = options.split(';');
        for (var i=0; i<OptionsArr.length;i++){
            let obj={};
            obj.id = OptionsArr[i].trim();
            obj.name = OptionsArr[i].trim();
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
        let start = startDate;
        let end = endDate;
        let instruct = instruction;
        let settingsStatus = false;
        if (response.status === 1){

            if (!isObjectEmpty(response.data)){
                subjectDATA = response.data.subject_data;

                if (!isObjectEmpty(response.data.question_data)){
                    let st = response.data.question_data.start; //start time info
                    let et = response.data.question_data.end; //end time info
                    start = new Date(st.yea, st.mon, st.day, st.hou, st.min, st.sec);
                    end = new Date(et.yea, et.mon, et.day, et.hou, et.min, et.sec);
                    settingsStatus = true;

                    instruct = response.data.question_data.instruction
                    questionDATA = response.data.question_data;
                }
            } else {
                console.log('response data is empty');
            }
        } else{
            console.log('Nothing here');
        }
        setQuestionData(questionDATA);
        setSubjectData(subjectDATA);
        setInstruction(instruct);
        setStartDate(start);
        setEndDate(end);
        setSettingsLogged(settingsStatus);
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
    //setEndDate(startDate);
    setShowSettingsModal(true);
  };

const handleCloseSettingsModal = () => {
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
            let settingsStatus = settingsLogged;
            if (response.status === 1){
                let st = response.data.start; //start time info
                let et = response.data.end; //end time info
                start = new Date(st.yea, st.mon, st.day, st.hou, st.min, st.sec);
                end = new Date(et.yea, et.mon, et.day, et.hou, et.min, et.sec);
                settingsStatus = true;
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
            //console.log(start);
            setStartDate(start);
            setEndDate(end);
            setSettingsLogged(settingsStatus);
            handleCloseSettingsModal();
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
    setSelectedAnswer([]);
    setExamQuestion(' ');
    setOptions(' ');
    setOptionsList([]);
    setQuestionType('');
    setShowAddModal(false);
};

const handleShowAddModal = () => {
    let modalStatus = showAddModal;
    if (settingsLogged){
        modalStatus = true;
    }
    setShowAddModal(modalStatus);
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
            handleCloseAddModal();
        });


    } else {
        Swal.fire({
            title: 'Empty Fields',
            icon: "error",
            text: "Some important fields are empty",
        })
    }
};

const serializeOptions = (item) => {
    let option = '';

    for (var i=0; i<item.options.length;i++)
    {
        if (i+1 == item.options.length){
            option += item.options[i];
        } else {
            option += item.options[i] + '; ';
        }
    }
    return option;
};

const handleEditQuestion = async (item) => {
    setQuestionToEdit(item);
    setEditQuestion(item.question);
    let stringOptions = await serializeOptions(item);
    setEditSelectedAnswer(item.answer);
    setEditQuestionType(item.question_type);
    processEditOptions(stringOptions);
    setShowEditModal(true);
};

const handleDeleteQuestion = (item) => {
    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This action cannot be reversed if successful.",
        showCancelButton: true,
        confirmButtonText: "Yes, delete.",
        confirmButtonColor: "#ffcd6e"
    }).then((value) => {
        if (value.isConfirmed) {
            triggerProcessing();
            const data = {}; //question data
            data.examina_id = question.get('examId');
            data.subject_id = question.get('subjectId');
            data.question_to_edit = item;

            if (data.question_to_edit){
                 // query backEnd
                const url = '/dashboard/'+userInfo().adminType;
                const action = 'DELETE-EXAM-QUESTION';

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

                    } else {
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            text: response.message,
                        });
                        console.log(response.error);
                    }
                    setQuestionData(res_data);
                });

            } else {
                Swal.fire({
                    title: 'Empty Fields',
                    icon: "error",
                    text: "Cannot find question to delete",
                })
            }
        }
    });
};

const handleCloseEditModal = () => {
    setShowEditModal(false);
};

const editQuestionsHandler = () => {
    triggerProcessing();
    const data = {}; //question data
    data.question = editQuestion;
    data.question_type = editQuestionType;
    data.options = editOptions.split(';');
    data.answer = editSelectedAnswer;
    data.examina_id = question.get('examId');
    data.subject_id = question.get('subjectId');
    data.question_to_edit = questionToEdit;
    //console.log(data);

    if (data.question && data.question_type && data.options && data.answer && data.question_to_edit){
         // query backEnd
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'EDIT-EXAM-QUESTION';

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
            handleCloseEditModal();
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
                        <Col sm={4}>
                            <Button variant="success" type="button" onClick={handleShowSettingsModal}>Exam Settings</Button>
                        </Col>
                        <Col sm={4}>
                            <Button variant="info" type="button" onClick={handleShowAddModal}>Add Question</Button>
                        </Col>
                        <Col sm={4}>
                            <Link to="/dashboard/teacher"><Button variant="success" type="button">Back To Dashboard</Button></Link>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        { questionData.content.map((item, index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.question}</td>
                                <td>
                                {item.options.map(opt =>
                                    <div>{"- "+opt.toString()}</div>
                                )}
                                </td>
                                <td>{item.question_type}</td>
                                <td>
                                {item.answer.map(ans =>
                                    <div>{ans}</div>
                                )}
                                </td>
                                <td>
                                <span className='set-question-span sp-1' onClick={() => {
                                    handleEditQuestion(item)
                                }}>
                                    Edit
                                </span>
                                <span className='set-question-span sp-2' onClick={(e) => {
                                    handleDeleteQuestion(item)
                                }}>
                                    Delete
                                </span>

                                </td>
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
                        onChange={e => {processOptions(e.target.value);
                        }}
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
                        onChange={e => setQuestionType(e.target.value)}
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

            {/* Edit Exam Question Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Editing Exam Question</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group  as={Row}>
                    <Col sm={12}>
                      <Form.Label >Question</Form.Label>
                      <textarea
                        rows={3}
                        cols={55}
                        value={editQuestion}
                        required={true}
                        placeholder="type your question here..."
                        onChange={e => setEditQuestion(e.target.value)}
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
                        value={editOptions}
                        onChange={e => processEditOptions(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group  as={Row} style={{marginTop: "20px"}}>
                    <Col sm={12}>
                      <Form.Label >Number of Correct Options</Form.Label>
                      <select
                        className="form-control"
                        required={true}
                        value={editQuestionType}
                        onChange={e => setEditQuestionType(e.target.value)}
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
                        <MultiSelectDropdown options={optionsList} selected={editSelectedAnswer} toggleOption={toggleAnswerOption2} title="name" />
                      </Form.Label>
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button variant="warning" onClick={editQuestionsHandler}>
                  Update Question
                </Button>
              </Modal.Footer>
            </Modal>

           </div>
         </section>
    </>
);
};

export default SetExamQuestions;