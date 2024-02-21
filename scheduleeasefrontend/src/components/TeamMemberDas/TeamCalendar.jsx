// TeamCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './teamCalendar.css';

const TeamCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    const eventName = prompt('Enter the name of the event:');

    if (eventName) {
      const newEvent = {
        title: eventName,
        date: selectedDate,
      };

      setEvents([...events, newEvent]);
    }
  };

  const tileContent = ({ date, view }) => {
    const eventDates = events.map((event) => event.date.toDateString());

    if (eventDates.includes(date.toDateString())) {
      return <div className="event-dot" />;
    }

    return null;
  };

  return (
    <div className="team-event-calendar">
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
      <div className="event-list">
        <h4>Events on {selectedDate.toLocaleDateString()}</h4>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.title} on {event.date.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <button className="cal-Button" onClick={handleAddEvent}>
        Add remainder 
      </button>
    </div>
  );
};

export default TeamCalendar;
