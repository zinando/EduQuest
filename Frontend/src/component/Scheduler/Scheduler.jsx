import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Scheduler = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventInputChange = (e) => {
    setEventText(e.target.value);
  };

  const handleAddEvent = () => {
    if (eventText.trim() === '') {
      return;
    }

    setEvents([...events, { date, text: eventText }]);
    setEventText('');
  };

  return (
    <div className="container"> {/* Apply the "container" class */}
      <h1>Scheduler</h1>
      <div>
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Event description"
          value={eventText}
          onChange={handleEventInputChange}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div>
        <h2>Events for {date.toLocaleDateString()}</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.date.toLocaleTimeString()}: {event.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scheduler;
