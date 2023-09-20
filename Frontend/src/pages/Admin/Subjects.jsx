import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';

export default function Subject() {
  const [users, setUsers] = useState([
    {
      id: 1,
      title: 'Mathematics JS 1',
      subject: 'Mathematics',
      teacher: 'Male',
      
    },
    {
      id: 2,
      title: 'English language JS 3',
      subject: 'English',
      teacher: 'Female',
    },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    title: '',
    subject: '',
    teacher: '',
   
  });

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
      
    });
  };

  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1, // Generate a new ID (replace)
    };
    setUsers([...users, newUserWithId]);
    handleCloseAddModal();
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div>
            <h1 className='custom-heading'>Manage Subject</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Subject
            </Button>
            <Table >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.title}</td>
                    <td>{user.subject}</td>
                    <td>{user.teacher}</td>
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
                      type="email"
                      placeholder="Enter Teacher"
                      value={selectedUser?.teacher || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, teacher: e.target.value })
                      }
                    />
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
                      type="email"
                      placeholder="Enter Teacher"
                      value={newUser.teacher}
                      onChange={(e) =>
                        setNewUser({ ...newUser, teacher: e.target.value })
                      }
                    />
                  </Form.Group>
                
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddUser}>
                  Add User
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}
