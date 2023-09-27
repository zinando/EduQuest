import { useState, useEffect } from 'react';
import './Timetable.css'; // Import your CSS file

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState('All');
  const [examSkedule, setExamSkedule] = useState([
    {
        subjects: ['Mathematics SS1', 'French SS3'],
        klasses: ['SS 1', 'SS 3'],
        skedule: {day: 'Monday', 'month': 'October', week: 44, start_time: '08:00:00 AM', end_time: '12:00:00 PM', date: '2023-10-03'}
    },
    {
        subjects: ['English JSS1', 'Literature SS2'],
        klasses: ['JSS 1', 'SS 2'],
        skedule: {day: 'Wednesday', 'month': 'October', week: 44, start_time: '08:30:00 AM', end_time: '10:30:00 AM', date: '2023-10-05'}
    }
  ]);

  useEffect(() => {
    // update state variables from session storage
    if (sessionStorage.getItem('examRecords')){
        //update state variables
        setExamSkedule(sessionStorage.getItem('examSkedule').json());
    }
  },[]);

const getList = function (list){
    var result = '';
    for (var i=0; i<list.length; i++){
        result += list[i] + ', ';
    }
    return result;
}

const getItems = function () {
    const list = [];
    for (var i=0; i<examSkedule.length; i++){
        const item = {};
        item.day = examSkedule[i].skedule.day;
        item.time = examSkedule[i].skedule.start_time + ' - ' + examSkedule[i].skedule.end_time;
        item.class = getList(examSkedule[i].klasses);
        item.subject = getList(examSkedule[i].subjects);
        list.push(item);
    }
    return list;
};
  const timetableData = getItems();

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
