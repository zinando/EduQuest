import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import queryBackEnd, { addSubject } from '../queryBackEnd';
import triggerProcessing from '../triggerProcessing';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Admin.css'

export default function Subject() {
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editTeacher, setEditTeacher] = useState('');
  const [editClass, setEditClass] = useState('');
  //const editClass = React.useRef('');
  const [newUser, setNewUser] = useState({
    title: '',
    subject: '',
    teacher: 0,
    subjectClass: 0,
  });

  useEffect(() => {
    // Fetch subjects and classes when the component mounts
    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    const url = '/admin_actions/manage_subjects';
    const action = 'FETCH-SUBJECTS';
    const data = {};
    const method = 'POST';

    // Fetch subjects from the backend
    queryBackEnd(url, data, action, method)
      .then((response) => {
            if (response.status === 1){
                try {
                  if (Array.isArray(response.data) && Array.isArray(response.class) && Array.isArray(response.teacher)) {
                    setSubjects(response.data);
                    setClasses(response.class);
                    setTeachers(response.teacher);
                  } else {
                    console.error('Invalid data format');
                  }
                } catch (error) {
                  console.error(error);
                }
            }
      })
      .catch((error) => console.error(error));
  };

  const handleEditSubject = (user) => {
    //editClass.current = user.klass;
    //console.log(editClass.current);
    setEditClass(user.klass);
    setEditTeacher(user.teacher);
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setEditTeacher('');
    setEditClass('');
    setShowEditModal(false);
  };

  const handleUpdateSubj = (updatedSubj) => {
  triggerProcessing();
  const worker = updatedSubj;
    const req_data = {id:worker.id, title:worker.title,
    general_title:worker.general_title, teacher:editTeacher,
    class:editClass};
    const url = '/admin_actions/manage_subjects';
    const action = 'EDIT-SUBJECT';
    queryBackEnd(url, req_data, action)
    .then((response) => {
        if (response.status ===1){
            Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message,
            });
            setSubjects(response.data);
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
    handleCloseEditModal();
  };

  const handleDeleteSubject = (subjId) => {
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
        const req_data = {id:subjId};
        const url = '/admin_actions/manage_subjects';
        const action = 'DELETE-SUBJECT';
        queryBackEnd(url, req_data, action)
        .then((response) => {
            if (response.status ===1){
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                });
                setSubjects(response.data);
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

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewUser({
      title: '',
      subject: '',
      teacher: 0,
      subjectClass: 0,
    });
  };

  // Function to add a subject
  const addSubjectHandler = () => {

    triggerProcessing();
    const { title, subject, teacher, subjectClass } = newUser;
    if (title && subject && subjectClass != 0) {
      // All required fields have values, proceed with adding the subject
      addSubject(title, subject, teacher, subjectClass)
        .then((response) => {
          if (response.status === 1) {
            // Subject added successfully, update the state
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
            });
            setSubjects(response.data);
            handleCloseAddModal();
          } else {
            console.error(response.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response.message,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: error,
          });
        });
    } else {
      // Display an error message when any of the required fields is empty
      console.error('All required fields are not filled');
    }
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className='p-4'>
            <h1 className="custom-heading">Manage Subject</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Subject
            </Button>
            <Table className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Subject Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subj) => (
                  <tr key={subj.id}>
                    <td>{subj.title}</td>
                    <td>{subj.general_title}</td>
                    <td>{teachers.find((classItem) => classItem.id === subj.teacher)?.name || ''}</td>
                    <td>{classes.find((classItem) => classItem.id === subj.klass)?.name || ''}</td>
                    <td>
                      <Button variant="primary" className="custom-button edit" onClick={() => handleEditSubject(subj)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" className="custom-button delete" onClick={() => handleDeleteSubject(subj.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>

            {/* Edit Subject Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Subject</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      value={selectedUser?.title || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject"
                      value={selectedUser?.general_title || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, general_title: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control
                      as="select"
                      value={editTeacher}
                      onChange={(e) =>
                        setEditTeacher(e.target.value)
                      }
                    >
                        <option value=''>Select</option>
                    {teachers.map((teacher) => (
                        <option value={teacher.id}>{teacher.name}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicSubjectClass">
                    <Form.Label>Subject Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={editClass}
                      onChange={(e) =>
                        setEditClass(e.target.value)
                      }
                    >
                      <option value={0}>Select</option>
                    {classes.map((klass) => (
                      <option value={klass.id}>{klass.name}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary"  onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdateSubj(selectedUser)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Add Subject Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Subject</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Enter Title"
                      value={newUser.title}
                      onChange={(e) =>
                        setNewUser({ ...newUser, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Subject"
                      value={newUser.subject}
                      onChange={(e) =>
                        setNewUser({ ...newUser, subject: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicTeacher">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.teacher}
                      onChange={(e) =>
                        setNewUser({ ...newUser, teacher: e.target.value })
                      }
                    >
                       <option value='0'>Select</option>
                    {teachers.map((teacher) => (
                      <option value={teacher.id}>{teacher.name}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicSubjectClass">
                    <Form.Label>Subject Class</Form.Label>
                    <Form.Control
                      as="select"
                      required={true}
                      value={newUser.subjectClass}
                      onChange={(e) =>
                        setNewUser({ ...newUser, subjectClass: e.target.value })
                      }
                    >
                      <option value='0'>Select</option>
                    {classes.map((klass) => (
                      <option value={klass.id}>{klass.name}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={addSubjectHandler}>
                  Add Subject
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}
