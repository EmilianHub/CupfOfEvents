import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/event')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleEventClick = (eventName) => {
        let eventNameTrim = eventName.toString().replace(" ", "")
        navigate(`/event/${eventNameTrim}`);
    };

    return (
        <div className="event-list-container">
            <h2>Available Events</h2>
            <ul className="event-list">
                {events.map(event => (
                    <li key={event.name} className="event-item" onClick={() => handleEventClick(event.name)}>
                        <h3>{event.name}</h3>
                        <p><strong>Price:</strong> {event.price}</p>
                        <p><strong>Date:</strong> {event.data}</p>
                        <p><strong>Available Seats:</strong> {event.availableSits}</p>
                        <p><strong>Age Limit:</strong> {event.age}</p>
                        <p><strong>Place:</strong> {event.place}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;