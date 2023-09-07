import '../../layout/Sidebar/SideBar.css'
import Navbar from '../../layout/NavBar/NavBar'
import Sidebar from '../../layout/Sidebar/SideBar'
import Table from 'react-bootstrap/Table';

export default function Subject() {
  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content" >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>



      </section>


    </>
  )
}

