import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ManagerCalendar.css';

const ManagerCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setevents] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // --------------Function For adding event---------------
    // const handleAddEvent = () => {
    //     const newEvent = {
    //         title: `Event ${events.length + 1}`,
    //         date: selectedDate
    //     };

    //     setevents([...events, newEvent]);
    // };

    // date format :  year-month-day
    useEffect(() => {
        const newEvent = {
            title: `Event 1`,
            date: new Date('2024-01-25'),
        };
        const newEvent2 = {
            title: `Event 2`,
            date: new Date('2024-01-29'),
        };
        const newEvent3 = {
            title: `Event 3`,
            date: new Date('2024-02-12'),
        };
        setevents([...events, newEvent, newEvent2, newEvent3]);
    }, []);

    const tileContent = ({ date, view }) => {
        const eventDates = events.map((event) => event.date.toDateString());

        if (eventDates.includes(date.toDateString())) {
            return <div className="event-dot" />;
        }
        return null;
    };

    return (
        <div className='manager-calendar'>
            <div className='cal-container'>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={tileContent}
                />
            </div>
        </div>
    );
};

export default ManagerCalendar;

// <div className="manager-calendar">
{/* --------------------Use below function when making it dynamic----------------- */ }
{/* <div className="event-list">
                <h4>Events on {selectedDate.toLocaleDateString()}</h4>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            {event.title} on {event.date.toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </div> */}
{/* <button className="cal-Button" onClick={handleAddEvent}>
                Add Event
            </button> */}
// </div>