import React, {useEffect, useState} from "react";
import Axios from "axios";
import "./PanelUzyForm.css"
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {readCookie} from "../CookiesManager/CookiesManager";

export default function Useredd(){

    const UserID = readCookie();
    const [ShowUseres, setShowUseres] = useState(false);
    const [isEdited, setisEdited] = useState(false);
    const [Imie, setImie] = useState("");
    const [Nazwisko, setNazwisko] = useState("");
    const [Login, setLogin] = useState("");
    const [Haslo, setHaslo] = useState("");
    const [Email, setEmail] = useState("");
    const [Pesel, setPesel] = useState("");
    const [NrDowodu, setNrDowodu] = useState("");
    const [SelectedID, setSelectedID] = useState("");

    function HandelEdit(id){
        // eslint-disable-next-line array-callback-return



                setSelectedID(ShowUseres.uzytkownik.id);
                setImie(ShowUseres.uzytkownik.imie);
                setNazwisko(ShowUseres.uzytkownik.nazwisko);
                setLogin(ShowUseres.uzytkownik.login);
                setHaslo(ShowUseres.uzytkownik.haslo);
                setEmail(ShowUseres.uzytkownik.email);
                setNrDowodu(ShowUseres.nrDowodu);
                setPesel(ShowUseres.pesel);



        setisEdited(true);
    }

    function Save() {
        Axios.post('http://localhost:8080/UpdateDanePV', {
            nrDowodu: NrDowodu.toString(),
            pesel: Pesel.toString(),
            uzytkownik:{
                id:parseFloat(UserID),
                imie: Imie.toString(),
                nazwisko: Nazwisko.toString(),
                email: Email.toString(),
                login: Login.toString(),
                haslo: Haslo.toString()
            }
        }).then((response)=>{
            if(response){
                setShowUseres(response.data)
            }
        })
    }

    function Anuluj(){
        setisEdited(false);
        setSelectedID(null);
        setImie(null);
        setNazwisko(null);
        setLogin(null);
        setEmail(null);
        setPesel(null);
        setNrDowodu(null);
    }
    useEffect(()=>{
        Axios.get(`http://localhost:8080/Dane/${UserID}`).then(response=>{
            setShowUseres(response.data)
            console.log(response.data)
        })
    }, [UserID])

    console.log(ShowUseres)
    return(
        <div className="Foremka">
            {ShowUseres ? <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className="TableAdmin">
                        <TableRow>
                            <TableCell className="Naglowek" align="center">Imię</TableCell>
                            <TableCell className="Naglowek" align="center">Nazwisko</TableCell>
                            <TableCell className="Naglowek" align="center">Login</TableCell>
                            <TableCell className="Naglowek" align="center">Email</TableCell>
                            <TableCell className="Naglowek" align="center">NrDowodu</TableCell>
                            <TableCell className="Naglowek" align="center">Pesel</TableCell>
                            <TableCell className="Naglowek" align="center">Edytuj</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isEdited === true ?
                            <TableRow>
                                <TableCell className="TableAdminCell"><input className="EditInput" defaultValue={Imie} onChange={(e)=>setImie(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><input className="EditInput" defaultValue={Nazwisko} onChange={(e)=>setNazwisko(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><input className="EditInput" defaultValue={Login} onChange={(e)=>setLogin(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><input className="EditInput" defaultValue={Email} onChange={(e)=>setEmail(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><input id="EditInput" defaultValue={NrDowodu} onChange={(e)=>setNrDowodu(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><input id="EditInput" defaultValue={Pesel} onChange={(e)=>setPesel(e.target.value)}/></TableCell>
                                <TableCell className="TableAdminCell"><button id="ActionButtonSave" onClick={()=>{Save()}}>Zapisz</button></TableCell>
                                <TableCell className="TableAdminCell"><button id="ActionButtonAnuluj" onClick={()=>{Anuluj()}}>Anuluj</button></TableCell>
                            </TableRow> : "" }
                        <TableRow>
                            <TableCell className="TableAdminCell" align="center" scope="row">{ShowUseres.uzytkownik.imie}</TableCell>
                            <TableCell className="TableAdminCell" align="center">{ShowUseres.uzytkownik.nazwisko}</TableCell>
                            <TableCell className="TableAdminCell" align="center">{ShowUseres.uzytkownik.login}</TableCell>
                            <TableCell className="TableAdminCell" align="center">{ShowUseres.uzytkownik.email}</TableCell>
                            <TableCell className="TableAdminCell" align="center">{ShowUseres.nrDowodu}</TableCell>
                            <TableCell className="TableAdminCell" align="center">{ShowUseres.pesel}</TableCell>

                            <TableCell align="center" className="TableAdminCell"><EditIcon className="EditIcon" onClick={()=>HandelEdit(ShowUseres.uzytkownik.id)}/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> : ""}
        </div>
    )
}