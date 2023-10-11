import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ExamSubjects from '../Exam/ExamSubjects';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col, Modal } from 'react-bootstrap';
import queryBackEnd, { userInfo } from '../../pages/queryBackEnd';
import './Item.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import triggerProcessing from '../../pages/triggerProcessing';
import { Link } from 'react-router-dom';

const ItemTable = () => {
  //define state variables
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examRecords, setExamRecords] = useState([{id: 0, title: '', type: '', klasses: [], teacher_subjects: []}]);
  const [showViewExcludeModal, setShowViewExcludeModal] = useState(false);
  const [excludedItemClass, setExcludedItemClass] = useState({});
  const [selectedRecord, setSelectedRecord] = useState({});
  const [notification, setNotification] = useState({review_request: '', review_status: '', question_count: ''});


  useEffect(() => {
        //update state variables
        const url = '/dashboard/'+ userInfo().adminType;
        const action = 'FETCH-EXAM-INSTANCES';
        const data = {};
        const method = 'POST';
        let examinaRecords = examRecords;
        let myClasses = []; let mySubjects = [];

        // Fetch data from the backend
        queryBackEnd(url, data, action, method)
          .then((response) => {

                if (response.status === 1){
                examinaRecords= response.exams;
                myClasses = response.klass;
                mySubjects = response.subjects;

            }
            setClasses(myClasses);
            setSubjects(mySubjects);
            setExamRecords(examinaRecords);
          })
          .catch((error) => console.error(error));

  },[]);

  const updateRecords = (data) => {
        setExamRecords(data);
  };

  const handleToggleHiddenRow = (id, subjects) => {
    //display subjects that teacher should set exams on

    var status = document.getElementById("hidden-row"+id.toString()).hidden;
    if (status) {
            document.getElementById("hidden-row"+id.toString()).hidden = false;
            document.getElementById("display-button"+id.toString()).innerHTML = "Hide Subjects ("+subjects.length+")";
    } else {
            document.getElementById("hidden-row"+id.toString()).hidden= true;
            document.getElementById("display-button"+id.toString()).innerHTML = "Show Subjects ("+subjects.length+")";
        }

  };

  return (
    <>
    <Container className="item-container">
        <Row className="item-row">
            <Col sm={2} className="item item-header">Duration</Col>
            <Col sm={3} className="item item-header">Description</Col>
            <Col sm={2} className="item item-header">Type</Col>
            <Col sm={2} className="item item-header">Classes</Col>
            <Col sm={3} className="item item-header">Actions</Col>
        </Row>
        {examRecords.map((rec) => (
        <Row key={rec.id} className="item-row">
            <Col sm={2} className="item item-body">
                <div>{rec.start}</div>
                <div> to </div>
                <div>{rec.end}</div>
            </Col>
            <Col sm={3} className="item item-body">{rec.title}</Col>
            <Col sm={2} className="item item-body">{rec.type}</Col>
            <Col sm={2} className="item item-body">
                {rec.klasses.map((klass) =>(
                                        <div>{classes.find((k) => k.id ===klass)?.name}</div>
                                        )
                            )
                }
            </Col>
            <Col sm={3} className="item item-body">
                <div className="d-inline hidden-items-display">
                    <a className="hidden-items-display btn" id={"display-button"+rec.id.toString()} variant="warning" onClick={() => handleToggleHiddenRow(rec.id, rec.teacher_subjects)}>
                      Show Subjects ({rec.teacher_subjects.length})
                    </a>
              </div>
            </Col>
             <Col sm={12} className="hidden-row" hidden={true} id={"hidden-row"+rec.id.toString()}>
                <Col sm={12} className="text-center hidden-row-item" style={{background: '#eeeeee'}}>Subjects You Have To Set Exam Questions On</Col>
                {rec.teacher_subjects.length > 0

                    ? <ExamSubjects subjectList={rec.teacher_subjects} classes={classes} />

                    : <Col sm={12} className="text-center alert alert-danger hidden-row-item">Sorry you have no questions to set</Col>

                }
             </Col>
        </Row>


        ))}
    </Container>

    {/* View Excluded Subjects Modal */}
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Excluded Subjects</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subject Title</th>
              <th>Subject Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ItemTable;
