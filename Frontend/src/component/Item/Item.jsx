import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import fetchDashboardData from '../../pages/fetchResources';
import queryBackEnd, { userInfo } from '../../pages/queryBackEnd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import triggerProcessing from '../../pages/triggerProcessing';

const ItemTable = () => {
  //define state variables
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examRecords, setExamRecords] = useState([{id: 0, title: '', type: '', klasses: [], exclude: []}]);
  const [excludedItems, setExcludedItems] = useState([]);
  const [showViewExcludeModal, setShowViewExcludeModal] = useState(false);
  const [excludedItemClass, setExcludedItemClass] = useState({});
  const [selectedRecord, setSelectedRecord] = useState({});


  useEffect(() => {
        const url = '/dashboard/'+ userInfo().adminType;
        const action = 'FETCH-EXAM-INSTANCES';
        const data = {};
        const method = 'POST';

        let my_class = classes;
        let my_subject = subjects;
        let my_record = examRecords;

        queryBackEnd(url, data, action, method)
          .then((response) => {
                if (response.status ===1){
                    my_class = response.klass;
                    my_subject = response.subjects;
                    my_record = response.exams;
                }
                setClasses(my_class);
                setSubjects(my_subject);
                setExamRecords(my_record);
          })
          .catch((error) => console.error(error));
  },[]);

  const updateRecords = (data) => {
        setExamRecords(data);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        triggerProcessing();
        const req_data = {id:id};
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'DELETE-EXAM-INSTANCE';
        queryBackEnd(url, req_data, action)
        .then((response) => {
            if (response.status ===1){
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                });
                //setSubjects(response.data);
                updateRecords(response.data);
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response.message,
                })
            }
        }).catch((error) => {
              console.error(error);
            });
    }
    });
  };

  const handleViewExcluded = (record) => {
    setExcludedItems(record.exclude);
    setSelectedRecord(record);
    setShowViewExcludeModal(true);
  };

  const getExcludedItemClass = (item) => {
    const subj = subjects.filter(function (subjj){
        return subjj.id ===item;
    });
    return classes.find((klass) => klass.id === subj[0].klass)?.name;
  };

  const handleCloseViewExcludeModal = () => {
        setShowViewExcludeModal(false);
  }

  const deleteExcludedItem = (excludedId, examId) => {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        triggerProcessing();
        const req_data = {excluded_id:excludedId, exam_id: examId};
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'DELETE-EXCLUDED-ITEM';
        queryBackEnd(url, req_data, action)
        .then((response) => {
            if (response.status ===1){
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                });
                updateRecords(response.data);
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response.message,
                })
            }
        }).catch((error) => {
              console.error(error);
            });
    }
    });
  };

  const handlePublishResult = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Publish!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        triggerProcessing();
        const req_data = {exam_id: id};
        const url = '/dashboard/'+userInfo().adminType;
        const action = 'PUBLISH-RESULT';
        queryBackEnd(url, req_data, action)
        .then((response) => {
            if (response.status ===1){
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                }).then(()=>{
                    location.reload();
                });
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response.message,
                })
            }
        }).catch((error) => {
              console.error(error);
            });
      }
    });
  };

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Duration</th>
          <th>Description</th>
          <th>Type</th>
          <th>Classes</th>
          <th>Excluded </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {examRecords.map((rec) => (
          <tr key={rec.id}>
            <td>
                <div>{rec.start}</div>
                <div> to </div>
                <div>{rec.end}</div>
            </td>
            <td>{rec.title}</td>
            <td>{rec.type}</td>
            <td>
            {rec.klasses.map((klass) =>(
                                        <div>{classes.find((k) => k.id ===klass)?.name}</div>
                                        )
                            )
            }
            </td>
            <td>
                <Button variant="warning" onClick={() => handleViewExcluded(rec)}>
                    View
                </Button>
            </td>

            <td>
                <div className="d-inline">
                <Button
                  variant="warning"
                  style={{backgroundColor: "#e97463"}}
                  onClick={() => handlePublishResult(rec.id)}
                >
                {rec.publish_status === 0 && (
                    <span>Publish Result</span>
                )}
                {rec.publish_status === 1 && (
                    <span>Withdraw Result</span>
                )}
                </Button>
              </div>
              <div className="d-inline" style={{margin: "8px", backgroundColor: "#e97463"}}>
                <Button
                  variant="warning"
                  onClick={() => handleDelete(rec.id)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    {/* View Excluded Subjects Modal */}
    <Modal show={showViewExcludeModal} onHide={handleCloseViewExcludeModal}>
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
              {excludedItems.map((item) => (
                <tr>
                    <td>{subjects.find((subj) => subj.id === item)?.title}</td>
                    <td>{getExcludedItemClass(item)}</td>
                    <td>
                        <Button variant="warning" onClick={() => deleteExcludedItem(item, selectedRecord.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
              ))}
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
