import React, {useEffect, useState} from "react";
import axios from "axios";
import "./ProfilForm.css";
import {useNavigate} from "react-router-dom";
import {readCookie} from "../CookiesManager/CookiesManager";
export default function ProfilForm(){

    let navigate = useNavigate();
    const userId = readCookie();
    const [pozyczki, setPozyczki]= useState([]);

    function Dane(){
        axios.post(`http://localhost:8080/profil/${userId}`
        ).then(response => {
            setPozyczki(response.data)
            console.log(pozyczki)
        })
    }
    useEffect(()=> {
        Dane();
    },[userId])

    function refreshPage() {
        window.location.reload(false);
    }
    console.log(pozyczki)
    return(
        <div className={"cala"}>
        <table className={"ProfilCont"}>
            {/*<div className={"profilH1"}> Profil użytkownika </div>
            <div className={"profilTable"}>*/}
            <h1  className={"profilH1"}> <button className={"profilBtn"} onClick={refreshPage}>Pokaż aktywne pożyczki</button> </h1>
            <tbody>
                    <tr>
        <th className={"cth"}>Nr pożyczki </th>
        <th className={"cth"}> Data zaciągnięcia </th>
        <th className={"cth"}>Kwota pożyczki </th>
        <th className={"cth"}>Data zakończenia </th>
        <th className={"cth"}> Wysokość raty</th>
        <th className={"cth"}> Status pożyczki </th>
        <th className={"cth"}> Spłać ratę</th>
    </tr>

        {pozyczki.map((value) =>{
           return <tr>
                <td className={"ctd"}> {value.id}.</td>
                <td className={"ctd"}> {value.dataZaciagnieciaPozyczki}</td>
                <td className={"ctd"}> {value.kwotaPozyczki} PLN</td>
                <td className={"ctd"}> {value.dataZakonczeniaPozyczki}</td>
                <td className={"ctd"}> {value.rata} PLN</td>
                <td className={"ctd"}> {value.active ? "Aktywna" : "Splacona"}</td>
                <td className={"ctd"}> <button className={"td-butn"} disabled={!value.active} onClick={() => navigate(`/splacKredyt/${value.id}`)}>Spłać</button></td>
            </tr>
        })}
            </tbody>
        </table>
        </div>
    )
}