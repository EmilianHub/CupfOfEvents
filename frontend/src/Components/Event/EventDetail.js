import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetail.css';


const EventDetail = () => {
    const { eventName } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/event/${eventName}')
    .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event:', error));
    }, [eventName]);

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="event-detail">
            <h2>{event.name}</h2>
            <p><strong>Price:</strong> {event.price}</p>
            <p><strong>Date:</strong> {event.data}</p>
            <p><strong>Available Seats:</strong> {event.availableSits}</p>
            <p><strong>Age Limit:</strong> {event.age}</p>
            <p><strong>Place:</strong> {event.place}</p>
        </div>
    );
};

export default EventDetail;