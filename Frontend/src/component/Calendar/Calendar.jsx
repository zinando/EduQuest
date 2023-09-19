import { useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

const FullCalendarComponent = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, dayGridPlugin],
      timeZone: 'UTC',
      themeSystem: 'bootstrap5',
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      weekNumbers: true,
      dayMaxEvents: true,
      editable: true,
      events: [
        {
          title: 'English Language',
          
          start: '2023-09-20T14:30:00',
          extendedProps: {
            status: 'done',
          },
        },
        {
          title: 'Geography',
          start: '2023-09-22T07:00:00',
          backgroundColor: 'green',
          borderColor: 'green',
        },
        
      ],
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  <div className="calendar-container">
    <div ref={calendarRef}></div>
  </div>
};

export default FullCalendarComponent;
