import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ExamSubjects from '../Exam/ExamSubjects';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Row, Col, Modal } from 'react-bootstrap';
import fetchDashboardData from '../../pages/fetchResources';
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
                    <a href="/Support" className="hidden-items-display btn"  variant="warning">
                      Show Result
                    </a>
              </div>
            </Col>
        </Row>

        ))}
    </Container>
    </>
  );
};

export default ItemTable;
