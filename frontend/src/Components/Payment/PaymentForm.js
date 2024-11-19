import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { readCookie } from "../CookiesManager/CookiesManager";
import "./PaymentForm.css"

const PaymentForm = () => {
    const navigate = useNavigate();
    const maxTries = 10;
    let i = 0;
    const userName = readCookie();
    const { eventName } = useParams();

    const [formData, setFormData] = useState({
        cardNumber: '',
        csv: '',
        name: '',
        surname: ''
    });
    const [paymentStatus, setPaymentStatus] = useState('Oczekiwanie na płatność...');

    // Obsługa zmian w formularzu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Obsługa przesyłania formularza płatności
    const handleSubmit = (e) => {
        e.preventDefault();

        // Przygotowanie danych do wysłania w formacie JSON
        const paymentCredentialsDTO = {
            dane: formData.cardNumber,
            csv: formData.csv,
            name: formData.name,
            surname: formData.surname
        };

        // Wywołanie endpointu płatności w Springu
        fetch(`http://localhost:8080/payment/${userName}/${eventName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentCredentialsDTO)
        })
            .then(response => {
                if (response.ok) {
                    setPaymentStatus('Płatność zakończona sukcesem!');
                    saveTicket(i)
                } else {
                    setPaymentStatus('Błąd płatności, spróbuj ponownie.');
                }
            })
            .catch(error => {
                console.error('Błąd płatności:', error);
                setPaymentStatus('Błąd połączenia z serwerem płatności.');
            });
    };

    const saveTicket = (tries) => {
        console.log(`i ${tries}`)
            fetch(`http://localhost:8080/ticket/single/${userName}/${eventName}`)
                .then(response => {
                    console.log(response.status)
                    if (response.status === 200) {
                        alert('Bilety zostały przypisane do twojego konta');
                        navigate(`/profil`)
                    } else if (tries === maxTries) {
                        alert('Coś poszło nie tak płatnośc zostanie zwrócona');
                    } else {
                        saveTicket(tries++)
                    }
                })
                .catch(error => {
                    console.error('Błąd płatności:', error);
                    setPaymentStatus('Błąd połączenia z serwerem płatności.');
                });
    }

    return (
        <div className="payment-form">
            <h2>Formularz Płatności</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Numer karty:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Numer CSV:
                    <input
                        type="text"
                        name="csv"
                        value={formData.csv}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Imię:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Nazwisko:
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Zapłać</button>
            </form>

            <p>Status płatności: {paymentStatus}</p>
        </div>
    );
};

export default PaymentForm;
