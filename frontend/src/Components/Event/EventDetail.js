import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { readCookie } from "../CookiesManager/CookiesManager"
import './EventDetail.css';


const EventDetail = () => {
    const { eventName } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/event/' + eventName)
    .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error('Error fetching event:', error.data.reason));
    }, [eventName]);

    const handleBuyTicket = () => {
        console.log('Zakupiono bilet na:', event.name);
        let userName = readCookie();
        fetch(`http://localhost:8080/ticket/${userName}/${eventName}`, {
            method: 'POST'
        })
            .then(respnse => console.log(respnse.json()))
            .then(data => goToPayment(data))
            .catch(error => console.error('Error fetching event:', error.data.reason))
    };

    const goToPayment = (data) => {
        let eventNameTrim = eventName.toString().replace(" ", "")
        navigate(`/payment/${eventNameTrim}`);
    }

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="event-detail">
            <h2>{event.name}</h2>
            <p><strong>Price:</strong> {event.price}</p>
            <p><strong>Date:</strong> {event.data}</p>
            <p><strong>Available Seats:</strong> {event.availableSits}</p>
            <p><strong>Age Limit:</strong> {event.age}</p>
            <p><strong>Place:</strong> {event.place}</p>

            <button onClick={handleBuyTicket}>Kup bilet</button>
        </div>
    );
};

export default EventDetail;