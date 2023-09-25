import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../Schedule/Schedule.css';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import queryBackEnd from '../queryBackEnd';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Classes() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    class: '',
  });

  // URL and action for fetching classes
  const fetchUrl = '/admin_actions/manage_classes';
  const fetchAction = 'FETCH-CLASSES';
  const fetchData = {};
  const fetchMethod = 'POST';

  // Function to fetch classes from the backend
  const fetchClasses = () => {
    queryBackEnd(fetchUrl, fetchData, fetchAction, fetchMethod)
      .then((response) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          // Update the 'users' state with the fetched classes
          setUsers(response.data.map((classObj) => ({
            id: classObj.id,
            class: classObj.name,
          })));
        } else {
          console.error('Failed to fetch classes:', response.message);
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
  };

  const handleUpdateUser = () => {
    const classId = selectedUser.id;
    const className = selectedUser.class;

    if (!className) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Class name cannot be empty.',
      });
      return;
    }

    // Prepare data for the update request
    const updateData = {
      id: classId,
      class_name: className,
    };

    // Send the update request
    queryBackEnd(fetchUrl, updateData, 'EDIT-CLASS', fetchMethod)
      .then((response) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          // Update the users state with the new list of classes
          setUsers(response.data.map((classObj) => ({
            id: classObj.id,
            class: classObj.name,
          })));
          handleCloseEditModal();

          // Display the success message
          Swal.fire({
            icon: 'success',
            title: 'Class Updated',
            text: 'Class has been updated successfully.',
          });
        } else {
          console.error('Operation was not successful:', response.message);
          // Display the error message from the API response
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message || 'Failed to update the class. Please try again later.',
          });
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Please check your internet connection and try again.',
        });
      });
  };

  const handleDeleteUser = (userId) => {
    // Display a confirmation
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the deletion, proceed with deletion
        const classIdToDelete = userId;

        // Prepare data for the delete request
        const deleteData = {
          id: classIdToDelete,
        };

        // Send the delete request
        queryBackEnd(fetchUrl, deleteData, 'DELETE-CLASS', fetchMethod)
          .then((response) => {
            if (response.status === 1 && Array.isArray(response.data)) {
              // Update the users state with the new list of classes after deletion
              setUsers(response.data.map((classObj) => ({
                id: classObj.id,
                class: classObj.name,
              })));

              // Display a success message
              Swal.fire({
                icon: 'success',
                title: 'Class Deleted',
                text: 'Class has been deleted successfully.',
              });
            } else {
              console.error('Operation was not successful:', response.message);
              // Display the error message from the API response
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.message || 'Failed to delete the class. Please try again later.',
              });
            }
          })
          .catch((error) => {
            console.error('Network error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Network Error',
              text: 'Please check your internet connection and try again.',
            });
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
      class: '',
    });
  };

  // Function to add a class
  const addClass = () => {
    const className = newUser.class;

    if (className) {
      queryBackEnd('/admin_actions/manage_classes', { class_name: className }, 'ADD-CLASS', 'POST')
        .then((response) => {
          console.log('API Response:', response);

          if (response.status === 1 && Array.isArray(response.data)) {
            // Update the users state with the new list of classes
            setUsers(response.data.map((classObj) => ({
              id: classObj.id,
              class: classObj.name,
            })));
            handleCloseAddModal();

            // Display the success message
            Swal.fire({
              icon: 'success',
              title: 'Class Added',
              text: 'Class has been added successfully.',
            });
          } else {
            console.error('Operation was not successful:', response.message);
            // Display the error message from the API response
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message || 'Failed to add the class. Please try again later.',
            });
          }
        })
        .catch((error) => {
          console.error('Network error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Please check your internet connection and try again.',
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Class name cannot be empty.',
      });
    }
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div>
            <h1 className='custom-heading'>Manage Class</h1>
            <Button variant="primary" onClick={handleShowAddModal}>
              Add Class
            </Button>
            <Table>
              <thead>
                <tr>
                  <th>Class Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
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

            {/* Edit Class Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Class</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Class"
                      value={selectedUser?.class || ''}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, class: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateUser}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Add Class Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Class</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formBasicClass">
                    <Form.Label>Class Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Enter class title...'
                      value={newUser.class}
                      onChange={(e) =>
                        setNewUser({ ...newUser, class: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={addClass}>
                  Add Class
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}
