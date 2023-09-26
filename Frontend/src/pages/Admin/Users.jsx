import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import queryBackEnd, { addUser, validate } from '../queryBackEnd';
import triggerProcessing from '../triggerProcessing';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function User() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [newUser, setNewUser] = useState({
    id: 0,
    first_name: '',
    surname: '',
    other_names: '',
    userid: '',
    email: '',
    admin_type: 'student',
    password: '',
    password2: '',
    klass: 0
  });

// Function to handle password validation
  const checkPassword = async (value, from) => {
    if (from === 'p1') {
      setNewUser({ ...newUser, password: value });
      const passwordCheck = await validate(value);
      setErrorMessage(passwordCheck.message);
      if (passwordCheck.status === 1) {
        setFontColor('#0B88B3');
      } else {
        setFontColor('#E97464');
      }
    } else {
      setNewUser({ ...newUser, password2: value });
      if (value !== newUser.password) {
        setErrorMessage2('Passwords DO NOT match!');
      } else {
        setErrorMessage2('');
      }
    }
  }



  useEffect(() => {
    // Fetch user data from the backend and set it in the users state
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const url = '/admin_actions/manage_users';
    const action = 'FETCH-USERS';
    const data = {};
    const method = 'POST';

    // Fetch users from the backend
    queryBackEnd(url, data, action, method)
      .then((response) => {
            if (response.status === 1){
                try {
                  if (Array.isArray(response.data) && Array.isArray(response.class)) {
                    setUsers(response.data);
                    setClasses(response.class);
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


  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser({});
    setShowEditModal(false);
  };

  const handleUpdateUser = (userInfo) => {
    console.log(userInfo);
    triggerProcessing();
  const worker = userInfo;
    const req_data = {id:worker.id, userid:worker.userid,
    email:worker.email, first_name:worker.first_name, surname:worker.surname, other_names:worker.other_names,
    klass:worker.klass, admin_type:worker.admin_type};
    const url = '/admin_actions/manage_users';
    const action = 'EDIT-USER';
    queryBackEnd(url, req_data, action)
    .then((response) => {
        if (response.status ===1){
            Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message,
            });
            setUsers(response.data);
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

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      text: 'This action cannot be reversed',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        triggerProcessing();
        const req_data = {id:userId};
        const url = '/admin_actions/manage_users';
        const action = 'DELETE-USER';
        queryBackEnd(url, req_data, action)
        .then((response) => {
            if (response.status ===1){
                Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
                });
                setUsers(response.data);
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
      id: 0,
    first_name: '',
    surname: '',
    other_names: '',
    userid: '',
    email: '',
    admin_type: 'student',
    password: '',
    password2: '',
    klass: 0
    });
  };

  const handleAddUser = () => {
    if (!(newUser.first_name && newUser.surname && newUser.password && newUser.klass && newUser.admin_type)){
        alert('Some fields are empty');
        return;
    }
    triggerProcessing();
    addUser(newUser)
        .then((response) => {
          if (response.status === 1) {
            // Subject added successfully, update the state
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message,
            });
            setUsers(response.data);
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
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className='p-4'>
            <h1 className="custom-heading">Manage Users</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add User
            </Button>
            <Table className="custom-table">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Admin Type</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Other Names</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userid}</td>
                    <td>{user.admin_type}</td>
                    <td>{user.first_name}</td>
                    <td>{user.surname}</td>
                    <td>{user.other_names}</td>
                    <td>{user.email}</td>
                    <td>{classes.find((val) => val.id == user.klass)?.name || ''}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="custom-button edit"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        className="custom-button delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
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
                      value={selectedUser?.first_name || ''}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={selectedUser?.surname || ''}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          surname: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Other Names</Form.Label>
                    <Form.Control
                      type='text'
                      value={selectedUser?.other_names || ''}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          other_names: e.target.value,
                        })
                      }
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={selectedUser?.email || ''}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Admin Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={['student', 'super', 'teacher', 'reviewer'].find((val) => val == selectedUser.admin_type) || 'student'}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          admin_type: e.target.value,
                        })
                      }
                    >
                      <option value=''>Select</option>
                      {['student', 'teacher', 'reviewer', 'super'].map((klass) => (
                        <option value={klass}>{klass}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedUser.klass}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          klass: e.target.value,
                        })
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
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleUpdateUser(selectedUser)}
                >
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
                      required={true}
                      placeholder="Enter First Name"
                      value={newUser.first_name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, first_name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Enter Last Name"
                      value={newUser.surname}
                      onChange={(e) =>
                        setNewUser({ ...newUser, surname: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicGender">
                    <Form.Label>Other Names</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUser.other_names}
                      onChange={(e) =>
                        setNewUser({ ...newUser, other_names: e.target.value })
                      }
                    >
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
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Admin Type</Form.Label>
                    <Form.Control
                      as="select"
                      required={true}
                      value={newUser.admin_type}
                      onChange={(e) =>
                        setNewUser({ ...newUser, admin_type: e.target.value })
                      }
                    >
                      <option value=''>Select</option>
                      {['teacher', 'student', 'reviewer'].map((klass) => (
                        <option value={klass}>{klass}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={newUser.klass}
                      onChange={(e) =>
                        setNewUser({ ...newUser, klass: e.target.value })
                      }
                    >
                      <option value=''>Select</option>
                      {classes.map((klass) => (
                        <option value={klass.id}>{klass.name}</option>
                     ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => checkPassword(e.target.value, 'p1')
                      }
                    >
                    </Form.Control>
                    {errorMessage === '' ? null :
                      <span style={{
                        marginLeft: '10px',
                        fontSize: '11px',
                        color: fontColor,
                      }}>{errorMessage}</span>}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Re-type Password</Form.Label>
                    <Form.Control
                      type="password"
                      required={true}
                      placeholder="repeat password"
                      value={newUser.password2}
                      onChange={(e) => checkPassword(e.target.value, 'p2')
                      }
                    >
                    </Form.Control>
                    {errorMessage2 === '' ? null :
                      <span style={{
                        marginLeft: '10px',
                        fontSize: '11px',
                        color: '#E97464',
                      }}>{errorMessage2}</span>}
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
