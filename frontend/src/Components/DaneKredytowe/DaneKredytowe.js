import React, {useState} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {readCookie} from "../CookiesManager/CookiesManager"
import "./DaneKredytowe.css"
import DoneIcon from '@mui/icons-material/Done';

export default function DaneKredytowe() {
    let navigate = useNavigate();
    const {state} = useLocation();
    const userId = readCookie();
    const [nrKonta, setNrKonta] = useState("");
    const [errMes, setErrMess] = useState("");
    const [errLabel, setErrLabel] = useState(false);

    function sendFrom() {
        setErrLabel(false);
        axios.post("http://localhost:8080/zdolnosc-kredytowa/daneKredytowe", {
            nrKonta: nrKonta.toString(),
            zarobki: state.zarobki,
            wydatki: state.wydatki,
            uzytkownik: parseFloat(userId)
        }).then((response) => {
            window.alert("Proces udzielania pożyczki zakończony pomyślnie");
            navigate("/profil")
        }).catch(err => {
            setErrMess(err.response.data.message);
            if (errMes.toString().includes("Numer")) {
                setErrLabel(true);
            } else {
                window.alert("Wystąpił błąd, proszę spróbować ponownie")
            }
        });
    }

    function sliceInput(accNumber){
        if (!accNumber) {
            return setNrKonta();
        }
        setNrKonta(accNumber);
        const accNumberL = accNumber.length;
        if (accNumberL > 4) {
            setNrKonta(`PL ${accNumber.slice(0, 4)} ${accNumber.slice(4, accNumberL)}`);
        }
        if (accNumberL > 8) {
            setNrKonta(`PL ${accNumber.slice(0, 4)} ${accNumber.slice(4, 8)} ${accNumber.slice(8, accNumberL)}`);
        }
        if (accNumberL >= 12) {
            setNrKonta(`PL ${accNumber.slice(0, 4)} ${accNumber.slice(4, 8)} ${accNumber.slice(8, 12)} ${accNumber.slice(12, accNumberL)}`);
        }
        return nrKonta;
    }

    return(
        <div className={"DaneKred"}>
            <div className={"OpisKred"}>
                <h2>Do sfinalizowania kredytu proszę podać nr konta bankowego, na które mają zostać przelane środki.</h2>
            </div>
            <div>
                <div className={"KontynerKred"}>
                    <input className={"KredInput"} onChange={(v) => sliceInput(v.target.value)} placeholder={"1233 6354 0000 1112"} maxLength={16}/>
                    <button className={"SubmitButton"} onClick={sendFrom}><DoneIcon/></button>
                </div>
                {errLabel && <p className={"ErrorKred"}>{errMes}</p>}
            </div>
        </div>
    )
}