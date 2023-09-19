import { useState } from 'react';
import './Timetable.css'; // Import your CSS file

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState('All');
  const timetableData = [
    { day: 'Monday', time: '9:00 AM - 10:00 AM', subject: 'Math', class: 'A' },
    { day: 'Tuesday', time: '10:00 AM - 11:00 AM', subject: 'English', class: 'B' },
    { day: 'Wednesday', time: '11:00 AM - 12:00 PM', subject: 'Geography', class: 'C' },
    { day: 'Thursday', time: '11:00 AM - 12:00 PM', subject: 'Computer', class: 'C' },
    { day: 'Friday', time: '11:00 AM - 12:00 PM', subject: 'French', class: 'C' }
  ];

  const filteredData = selectedDay === 'All' ? timetableData : timetableData.filter(item => item.day === selectedDay);

  return (
    <div>
      <h4 className="custom-heading">Schedule</h4>
      <div className="filter-container">
        <label>Filter by Day:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          <option value="All">All</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Subject</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>{item.time}</td>
              <td>{item.subject}</td>
              <td>{item.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
