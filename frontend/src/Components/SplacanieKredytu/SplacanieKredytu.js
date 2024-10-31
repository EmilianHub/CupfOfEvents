import React, {useState, useEffect} from "react"
import {readCookie} from "../CookiesManager/CookiesManager";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./SplacanieKredytu.css"
import DoneIcon from '@mui/icons-material/Done';

export default function SplacanieKredytu(){
    const userId = readCookie();
    const {idPozyczki} = useParams()
    const [wplata, setWplata] = useState(false);
    const [kwotaSplaty, setKwotaSplaty] = useState();
    const navigate = useNavigate();

    function sprawdzRate(){
        axios.post(`http://localhost:8080/profil/singlePozyczka/${idPozyczki}`)
            .then(response => {
                setWplata(response.data)
                setKwotaSplaty(response.data.pozyczka.rata)
                console.log(response.data)
            })
            .catch(err => window.alert("Wystąpił bład podczas pobierania" + err.data.message))
    }

    function splacRate(){
        axios.post("http://localhost:8080/profil/splacRate", null, {
            params:{
                kwotaSplaty,
                idPozyczki
            }
        }).then(
            window.alert("Zapisano wplate"),
            navigate("/Profil")
        )
    }

    useEffect(() =>{
        sprawdzRate();
    }, [userId])

    return(
        <div>
            {wplata && <TableContainer className="SkTabela" component={Paper}>
            <Table aria-label="simple table">
                <TableHead className="SkTabela">
                    <TableRow>
                        <TableCell className="SkNaglowek" align="center">Kwota</TableCell>
                        <TableCell className="SkNaglowek" align="center">Wysokość miesięcznej raty</TableCell>
                        <TableCell className="SkNaglowek" align="center">Wysokość nadpłaty</TableCell>
                        <TableCell className="SkNaglowek" align="center">Wysokość niedopłaty</TableCell>
                        <TableCell className="SkNaglowek" align="center">Data ostatniej wpłaty</TableCell>
                        <TableCell className="SkNaglowek" align="center"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="SkCell" align="center" scope="row">
                            <input className={"SkInput"} type={"number"} defaultValue={kwotaSplaty} onChange={v => setKwotaSplaty(v.target.value)}/>
                        </TableCell>
                        <TableCell className="SkCell" align="center">{wplata.pozyczka.rata}</TableCell>
                        <TableCell className="SkCell" align="center">{wplata.nadPlata}</TableCell>
                        <TableCell className="SkCell" align="center">{wplata.nieDoplata}</TableCell>
                        <TableCell className="SkCell" align="center">{wplata.created}</TableCell>
                        <TableCell className="SkCell" align="center">
                            <button className={"SkButton"} onClick={() => splacRate()}><DoneIcon/></button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>}
        </div>
    )
}
