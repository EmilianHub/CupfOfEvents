import React, { useState, useEffect } from 'react';
import { readCookie } from "../CookiesManager/CookiesManager";
import './ProfilForm.css';

const ProfilForm = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userName = readCookie();
        if (!userName) {
            setError("Nie znaleziono nazwy użytkownika w ciasteczkach");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/ticket/${userName}/all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTickets(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Błąd pobierania biletów:", error);
                setError("Nie udało się pobrać biletów.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Ładowanie biletów...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="tickets-container">
            <h2>Posiadane Bilety</h2>
            {tickets.length === 0 ? (
                <p>Nie masz jeszcze żadnych biletów.</p>
            ) : (
                <table className="tickets-table">
                    <thead>
                    <tr>
                        <th>Wydarzenie</th>
                        <th>Data</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.event}</td>
                            <td>{ticket.data}</td>
                            <td>
                                    <span
                                        className={
                                            ticket.status === "done"
                                                ? "status-done"
                                                : ticket.status === "pending"
                                                    ? "status-pending"
                                                    : "status-failed"
                                        }
                                    >
                                        {ticket.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProfilForm;
