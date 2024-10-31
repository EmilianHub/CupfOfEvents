import React,{ useState } from "react";
import axios from "axios";
import "./LogForm.css"
import {createNewCookie, readCookie} from "../CookiesManager/CookiesManager"
import {useNavigate} from "react-router-dom";


export default function LogForm(){
    let navigate = useNavigate();
    const [haslo, setHaslo] = useState();
    const [login, setLogin] = useState();
    function subForm() {
        axios.post("http://localhost:8080/uzytkownik/logowanie", null, {
                params: {haslo, login}
            }
        ).then((response) => {
            console.log(response.data)
            if (response.data === 0) {
                window.alert(("złe dane"))
            } else {
                createNewCookie(response.data)
                navigate("/")
                window.location.reload(false)
            }
        })
    }

    return(
        <div className="Card1">
            <div  className={"formStyle1"} onSubmit={"handleSubmit"}>
                <div className={"formHeader"}>Logowanie </div> <br/>
                <div>

                    <label className={"labelStyle1"}>Login:</label><br/>
                    <input className={"inputStyle1"} onChange={(v)=>setLogin(v.target.value)} /><br/>
                </div>

                <div >
                    <label className={"labelStyle1"}>Hasło:</label><br/>
                    <input type="password" className={"inputStyle1"} onChange={(v)=>setHaslo(v.target.value)}/><br/>
                </div>

                <button className="button1"onClick={subForm}>Zaloguj</button>
            </div> </div>


    );
}