import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';

export default function Subject() {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    { id: 3, name: 'User 3', email: 'user3@example.com' },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

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
    setNewUser({ name: '', email: '' });
  };

  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1, // Generate a new ID remember ohhh
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
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
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={selectedUser?.name || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={selectedUser?.email || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, email: e.target.value })
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
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
