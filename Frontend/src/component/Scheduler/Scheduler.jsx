import  { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

const MyCalendar = () => {
  const calendarElRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarElRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [listPlugin],
      initialView: 'listWeek', 
      events: [ 
        {
          title: 'Event 1',
          start: '2023-09-26',
          end: '2023-09-26',
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
