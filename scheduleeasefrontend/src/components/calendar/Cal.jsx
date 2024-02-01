import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "./App.css";
import './Cal.css'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Cal() {
    const [events, setevents] = useState('')
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role==1){
            setAllEvents( [
                {
                    title: "Budget Review Meeting",
                    allDay: true,
                    start: new Date(2024, 1, 8),
                    end: new Date(2024, 1, 8),
                },
                {
                    title: "Personal Branding Workshop",
                    start: new Date(2024, 1, 18),
                    end: new Date(2024, 1, 21),
                },
                {
                    title: "Health Care Duedate",
                    start: new Date(2024, 1, 28),
                    end: new Date(2024, 1, 28),
                },
            ])
        }else if(JSON.parse(sessionStorage.getItem('loginData')).profile_data.role==2){
            setAllEvents( [
                {
                    title: "Customer entity front-end design",
                    allDay: true,
                    start: new Date(2024, 0, 15),
                    end: new Date(2024, 1, 15),
                },
                {
                    title: "Marketing analysis",
                    start: new Date(2024, 1, 10),
                    end: new Date(2024, 1 , 25),
                },
                {
                    title: "Meeting with Manager",
                    start: new Date(2024, 1, 5),
                    end: new Date(2024, 1, 5),
                },
            ])
        }
        }, [])

    function handleAddEvent() {
        
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                // alert("CLASH"); 
                // break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div className="Cal-con">
            {/* <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div> */}
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: "77vh" }} 
            
            />
        </div>
    );
}

export default Cal;