import React,{ useState } from "react";
import axios from "axios";
import "./KontaktForm.css";


export default function KontaktForm(){
    axios.defaults.withCredentials = true;


    return(
        <body className={"KredytyBack"}>
        <h1 className={"KredytyH1"}>Kontakt <br/> </h1>
        <h2 className={"KredytyH2"}>Infolinia: <h3 className={"KredytyH3"}>+48 666 777 888 </h3><br/>
            Minutówka Sp.z o.o. <br/>
            ul. Bogata 69, 41-219 Sosnowiec <br/>
            NIP: 6752973431 <br/>
            REGON: 382345139 <br/>
            E-mai: minutowka.kontakt@gmailcom
        </h2>
            <h1 className={"KredytyH1"}>Formularz kontaktowy</h1>

    <form className="form" id="formTest1" method="post">
            <div className="form-row">
                <label className={"KredytyLabel"} htmlFor="name">Imię*</label><br/>
                <input className={"KredytyInput"} type="text" name="name" id="name" pattern=".{3,}" required/>
            </div>
            <div className="form-row">
                <label className={"KredytyLabel"} htmlFor="email">Email*</label><br/>
                <input className={"KredytyInput"} type="email" name="email" id="email" required/>
            </div>
            <div className="form-row">
                <label className={"KredytyLabel"} htmlFor="message">Wiadomość*</label><br/>
                <textarea className={"KredytyText"} name="message" id="message" required></textarea>
            </div>
            <div className="form-row">
                <button type="submit" className="submit-btn">
                    Wyślij
                </button>
            </div>
        </form>
        </body>

    )}