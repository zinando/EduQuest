import  { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

const MyCalendar = () => {
  const calendarElRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarElRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [listPlugin],
      editable: true,
      initialView: 'listWeek', 
      events: [ 
        {
          title: 'Debate Show',
          start: '2023-09-26',
          end: '2023-09-26',
        },
        {
          title: 'Parent and Teachers Meeting',
          start: '2023-09-27',
          end: '2023-09-28',
        },
        {
          title: 'Drama Presentation',
          start: '2023-09-28',
          end: '2023-09-29',
        },
        {
          title: 'Event 2',
          start: '2023-09-2023 10:30:00',
          end: '2023-09-2023 12:30:00',
        },
      ],
      views: {
        listDay: { buttonText: 'Day' },
        listWeek: { buttonText: 'Week' },
        listMonth: { buttonText: 'Month' },
      },
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'listDay,listWeek,listMonth',
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div ref={calendarElRef} />
  );
};

export default MyCalendar;
