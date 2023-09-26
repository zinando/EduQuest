import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import queryBackEnd from '../../pages/queryBackEnd'


const ItemTable = () => {
  //define state variables
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [excludedItems, setExcludedItems] = useState([]);
  const [showViewExcludeModal, setShowViewExcludeModal] = useState(false);
  const [examRecords, setExamRecords] = useState([
    {
      id: 1,
      title: 'First Term Examination',
      klasses: [1, 2, 3, 6],
      type: 'Examination',
      start: '2023-10-03',
      end: '2023-11-02',
      exclude: [1, 2],
    },
    {
      id: 1,
      title: 'First Term Examination',
      klasses: [1, 2, 3, 6],
      type: 'Examination',
      start: '2023-10-03',
      end: '2023-11-02',
      exclude: [1, 2],
    },
  ]);

  useEffect(() => {
    if (sessionStorage.getItem('examRecords')){
        //update state variables
        setExamRecords(sessionStorage.getItem('examRecords').json());
        setClasses(sessionStorage.getItem('klass').json());
        setSubjects(sessionStorage.getItem('subjects').json());
    } else {
        // fetch data from database
        fetchData();
    }

  },[]);

  const fetchData = () => {
    const url = '/admin_actions/SUPER';
    const action = 'FETCH-EXAM-INSTANCES';
    const data = {};
    const method = 'POST';

    // Fetch data from the backend
    queryBackEnd(url, data, action, method)
      .then((response) => {
            if (response.status === 1){
                try {
                    //save items in session
                    sessionStorage.setItem('userStat', JSON.stringify(response.user_stat));
                    sessionStorage.setItem('examRecords', JSON.stringify(response.exams));
                    sessionStorage.setItem('examSkedule', JSON.stringify(response.skedule));
                    sessionStorage.setItem('klass', JSON.stringify(response.klass));
                    sessionStorage.setItem('subjects', JSON.stringify(response.subjects));

                    //update state variables
                    setExamRecords(response.exams);
                    setClasses(response.klass);
                    setSubjects(response.subjects);
                } catch (error) {
                  console.error(error);
                }
            }else if (response.status === 404){
                return "404 You are not authorized to view this page.";
            }
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {

  };

  const handleCloseViewExcludeModal = (id) => {

  };

  const deleteExcludedItem = (id) => {

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
          <th>Exclude </th>
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
                <Button variant="warning" onClick={() => handleViewExcluded(rec.exclude)}>
                        Delete
                </Button>
            </td>

            <td>
              <div className="d-inline">
                <Button
                  variant="danger"
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
                    <td>{classes.find((klass) => klass.id === subjects.find((subj) => subj.id === item)?.klass )}</td>
                    <td>
                        <Button variant="primary" onClick={() => deleteExcludedItem()}>
                            Delete
                        </Button>
                    </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseViewExcludeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleUpdateSubj(selectedUser)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ItemTable;
