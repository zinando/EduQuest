import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import queryBackEnd from '../queryBackEnd';

export default function Subject() {
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    title: '',
    subject: '',
    teacher: '',
    subjectClass: '',
  });

  useEffect(() => {
    // Fetch subjects and classes when the component mounts
    fetchSubjects();
    fetchClasses();
  }, []);

  const fetchSubjects = () => {
    const url = '/admin_actions/manage_subjects';
    const action = 'FETCH-SUBJECTS';
    const data = {};
    const method = 'POST';

    // Fetch subjects from the backend
    queryBackEnd(url, data, action, method)
      .then((data) => {
        if (data.status === 1) {
          setSubjects(data.data); // Assuming data.data contains the updated subject list
          console.log('Fetched subjects:', data.data);
        } else {
          console.error('Error fetching subjects:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  };

  const fetchClasses = () => {
    const url = '/admin_actions/manage_classes';
    const action = 'FETCH-CLASSES';
    const data = {};
    const method = 'POST';

    // Fetch classes from the backend
    queryBackEnd(url, data, action, method)
      .then((data) => {
        if (data.status === 1) {
          setClasses(data.data);
          console.log('Fetched classes:', data.data);
        } else {
          console.error('Error fetching classes:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching classes:', error);
      });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    handleCloseEditModal();
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewUser({
      title: '',
      subject: '',
      teacher: '',
      subjectClass: 'Class 1',
    });
  };

  // Function to add a subject
  const addSubjectHandler = () => {
    const { title, subject, teacher, subjectClass } = newUser;

    if (title && subject && teacher && subjectClass) {
      // All required fields have values, proceed with adding the subject
      const requestData = {
        title,
        subject,
        teacher,
        subjectClass,
        
      };

      // Send a POST request to add the subject
      queryBackEnd('/admin_actions/manage_subjects', requestData, 'ADD-SUBJECT', 'POST')
        .then((data) => {
          if (data.status === 1) {
            // Subject added successfully, update the state with the new subject
            setSubjects(data.data); 
            handleCloseAddModal(); 
          } else {
            console.error('Error adding subject:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error adding subject:', error);
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
          <div>
            <h1 className="custom-heading">Manage Subject</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Subject
            </Button>
            <Table>
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.title}</td>
                    <td>
                      {subjects.find((subject) => subject.id === user.subject)?.name || 'N/A'}
                    </td>
                    <td>{user.teacher}</td>
                    <td>
                      {classes.find((classItem) => classItem.id === user.subjectClass)?.name ||
                        'N/A'}
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditUser(user)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Edit User Modal */}
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
                      value={selectedUser?.subject || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, subject: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Teacher"
                      value={selectedUser?.teacher || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, teacher: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicSubjectClass">
                    <Form.Label>Subject Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.subjectClass}
                      onChange={(e) =>
                        setNewUser({ ...newUser, subjectClass: e.target.value })
                      }
                    >
                      {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdateUser(selectedUser)}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Add User Modal */}
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
                      type="text"
                      placeholder="Enter Teacher"
                      value={newUser.teacher}
                      onChange={(e) =>
                        setNewUser({ ...newUser, teacher: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicSubjectClass">
                    <Form.Label>Subject Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.subjectClass}
                      onChange={(e) =>
                        setNewUser({ ...newUser, subjectClass: e.target.value })
                      }
                    >
                      {classes.map((classItem) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
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
