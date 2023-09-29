import { useEffect, useRef, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyCalendar = () => {
  const calendarElRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');

  useEffect(() => {
    const calendarEl = calendarElRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [listPlugin],
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
      eventClick: handleEventClick,
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  function handleEventClick(info) {
    setSelectedEvent(info.event);
    setEventTitle(info.event.title);
    setEventStart(info.event.start.toISOString().substring(0, 16));
    setEventEnd(info.event.end.toISOString().substring(0, 16));
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleTitleChange(event) {
    setEventTitle(event.target.value);
  }

  function handleStartChange(event) {
    setEventStart(event.target.value);
  }

  function handleEndChange(event) {
    setEventEnd(event.target.value);
  }

  function saveEvent() {
    if (selectedEvent) {
      // Edit existing event
      selectedEvent.setProp('title', eventTitle);
      selectedEvent.setStart(eventStart);
      selectedEvent.setEnd(eventEnd);
    } else {
      // Add a new event
      const newEvent = {
        title: eventTitle,
        start: eventStart,
        end: eventEnd,
      };
      calendarElRef.current.getApi().addEvent(newEvent);
    }
    closeModal();
  }

  return (
  
      <div > 
      <div ref={calendarElRef} />
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Event
      </Button>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={eventTitle}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="eventStart">
              <Form.Label>Start Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={eventStart}
                onChange={handleStartChange}
              />
            </Form.Group>
            <Form.Group controlId="eventEnd">
              <Form.Label>End Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={eventEnd}
                onChange={handleEndChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="button" onClick={saveEvent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
  );
};

export default MyCalendar;
