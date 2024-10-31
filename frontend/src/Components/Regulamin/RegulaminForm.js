import React from "react";
import axios from "axios";
import "./RegulaminForm.css";

export default function RegulaminForm(){
    axios.defaults.withCredentials = true;



    return(
        <div className={"reg"}>
            <h1>Warunki umów, dokumenty i regulaminy wzięcia pożyczki:</h1>

            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Polityka prywatności</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Polityka plików cookie</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin promocji pierwszej pożyczki</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin promocji kolejnej pożyczki</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulacje prawne</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin serwisu</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Wykaz wymogów zgłaszania domów i pojazdów</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Wykaz badań lekarskich</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Bezpieczeństwo</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin oddawania organów</a></div>
            <div className={"link"}> <a className={"RegulaminA"} href={"/warunki"}>*Regulamin promocji "Nerka czy dom"</a></div>

        </div>

    )}