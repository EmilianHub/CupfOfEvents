import React, {useEffect, useState} from "react";
import axios from "axios";
import "./KredytForm.css";
import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import * as PropTypes from "prop-types";
import { CFormCheck } from '@coreui/react'
import {useNavigate, createSearchParams} from "react-router-dom";
import {format} from "date-fns";
import {readCookie} from "../CookiesManager/CookiesManager";


export default function KredytForm(){
    let navigate = useNavigate();
    const[kwota, setKwota] = useState(500);
    const[czas, setCzas] = useState(1);
    const[rrso, setRrso] = useState(0);
    const userId = readCookie();
    console.log(kwota)

    function buildPozyczkiClass(){
        let rozpoczecie = new Date(Date.now())
        let zakonczenie = new Date(Date.now())
        zakonczenie.setMonth(zakonczenie.getMonth() + czas)
        navigate("/formularz-zdolnosci-kredytowej", {
            state: {
                kwota: kwota.toString(),
                rozpoczecie: format(rozpoczecie, 'yyyy-MM-dd HH:mm:ss').toString(),
                zakonczenie: format(zakonczenie, 'yyyy-MM-dd HH:mm:ss').toString(),
                rrso: rrso.toString()
            }
        });
    }
    function czyKolejna(){
        axios.get(`http://localhost:8080/profil/count/${userId}`)
            .then((response )=>{
                console.log(response.data)
                if(response.data !=0) {
                    setRrso(1.75)
                }
                console.log(response.data)

        }
        )
    }
    useEffect(()=>{
        czyKolejna();
    },[userId])

    return(
    <div className={"cont"}>
        <div className={"gora"}>
            <h2 className={"KredytyH2"}>Pożyczka jakiej potrzebujesz w minutę!</h2> <br/>
            <h2 className={"KredytyH2"}>Nawet do 2000 zł</h2> <br/>
            <h2 className={"KredytyH2"}>RRSO: 0%</h2>
        </div>
        <div className={"dol"}>
                <div className={"tab"}>
                    <h1 className={"KredytyH1"}>Informacje:</h1>
                    Całkowity koszt pierwszej pożczyki 0zł <p/>
                    Pieniądze na koncie tego samego dnia <p/>
                    Oprocentowanie w skali roku 0% <p/>
                    Szybki wniosek składany online <p/>
                    Umowa na okres 30 dni <p/>

                </div>
                <div className={"tab1"}>
                    <h1 className={"KredytyH1"}><span className={"kolorek"}>Pożyczka:</span></h1>
                    <h2 className={"KredytyH2"}><span className={"kolorek"}>Podaj kwotę: </span><br/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option1" autoComplete="off" label="500zł" value={500} defaultChecked onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option2" autoComplete="off" label="700zł" value={700} onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option3" autoComplete="off" label="1000zł" value={1000} onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option4" autoComplete="off" label="1200zł" value={1200} onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option5" autoComplete="off" label="1500zł" value={1500} onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option6" autoComplete="off" label="1700zł" value={1700} onChange={(v) => setKwota(v.target.value)}/>
                    <CFormCheck button={{ color: 'secondary' }} type="radio" name="options-outlined" id="option7" autoComplete="off" label="2000zł" value={2000} onChange={(v) => setKwota(v.target.value)}/>
                        <br/><span className={"kolorek"}>Czas trwania: 30 dni </span><br/>
                        <span className={"kolorek"}>Rata: {kwota} zł</span></h2>
                    <h3 className={"KredytyH3"}><button className={"KredytyButton"} onClick={buildPozyczkiClass}>Weź pożyczkę</button></h3>
                </div>
        </div>
    </div>
)}
