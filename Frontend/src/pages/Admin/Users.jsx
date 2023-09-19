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
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      email: 'johndoe@example.com',
      class: 'Class A',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      gender: 'Female',
      email: 'janesmith@example.com',
      class: 'Class B',
    },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    email: '',
    class: 'Class A',
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
      firstName: '',
      lastName: '',
      gender: 'Male',
      email: '',
      class: 'Class A',
    });
  };

  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1, // Generate a new ID (replace with your logic)
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
            <h1>Manage Users</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add User
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>{user.class}</td>
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
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={selectedUser?.firstName || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, firstName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={selectedUser?.lastName || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, lastName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedUser?.gender || 'Male'}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, gender: e.target.value })
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={selectedUser?.email || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedUser?.class || 'Class A'}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, class: e.target.value })
                      }
                    >
                      <option value="Class A">Class A</option>
                      <option value="Class B">Class B</option>
                      <option value="Class C">Class C</option>
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
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.gender}
                      onChange={(e) =>
                        setNewUser({ ...newUser, gender: e.target.value })
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({ ...newUser, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.class}
                      onChange={(e) =>
                        setNewUser({ ...newUser, class: e.target.value })
                      }
                    >
                      <option value="Class A">JS 1</option>
                      <option value="Class B">JS 2</option>
                      <option value="Class C">JS 3</option>
                      <option value="Class C">SS 1</option>
                      <option value="Class C">SS 2</option>
                      <option value="Class C">SS 3</option>
                    </Form.Control>
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
