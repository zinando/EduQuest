import { useState } from 'react';
import Calendar from 'react-calendar'; 
import './Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Table from 'react-bootstrap/Table';

export default function Subject() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content ps-4">
          {/* calendar component */}
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
          <Table striped bordered hover>
            {/* ..table content ... */}
          </Table>
        </div>
      </section>
    </>
  );
}
