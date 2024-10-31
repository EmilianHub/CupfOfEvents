import React,{ useState } from "react";
import axios from "axios";
import "./RejForm.css";
import {useNavigate} from "react-router-dom";


export default function RejForm(){
    let navigate = useNavigate();
    const [imie, setImie] = useState();
    const [nazwisko, setNazwisko] = useState();
    const [email, setEmail] = useState();
    const [haslo, setHaslo] = useState();
    const [login, setLogin] = useState();
    const [pothas, setPothas] = useState();

    function sendFrom(){
        clearAllErrors();
        axios.post("http://localhost:8080/uzytkownik/rejestracja", {
                imie: imie,
                nazwisko: nazwisko,
                email: email,
                haslo:haslo,
                login:login,
            }
        ).then((response) => {
            console.log(response.data)
            if(response.data==="POSITIVE"){
                window.alert("Założyłeś Konto :).");
                navigate('/Login');
            }else{
                window.alert("wystąpił błąd :( .");

            }
        }).catch((error) =>{
            console.log(error.response.data.message)
            setErrMess(error.response.data.message)
            if (errMess.toString().includes("Login")){
                setLoginMessage(errMess)
            }else if (errMess.toString().includes("Email")){
                setEmailMessage(errMess)
            }else if (errMess.toString().includes("Haslo")){
                setHasloMessage(errMess)
            }
        })
    }

    function clearAllErrors(){
        setLoginMessage();
        setHasloMessage();
        setEmailMessage();
    }

    const [loginMessage, setLoginMessage] = useState()
    const [hasloMessage, setHasloMessage] = useState()
    const [emailMessage, setEmailMessage] = useState()
    const [errMess, setErrMess] = useState("")

    return(
        <div className="Card">
            <div  className={"formStyle"} onSubmit={"handleSubmit"}>
                <div className={"formHeader"}>Rejestracja </div> <br/>
                <div >
                    <label className={"labelStyle"}>Imię:</label><br/>
                    <input className={"inputStyle"} onChange={(v)=>setImie(v.target.value)} /><br/>
                </div>
                <div >
                    <label className={"labelStyle"}> Nazwisko:</label><br/>
                    <input className={"inputStyle"}onChange={(v)=>setNazwisko(v.target.value)} /><br/>
                </div>
                <div >
                    <label className={"labelStyle"} >Email:</label><br/>
                    <input className={"inputStyle"} onChange={(v)=>setEmail(v.target.value)} />
                    {emailMessage && <p className={"errorLabel"}> {emailMessage} </p>}
                </div>
                <div>

                    <label className={"labelStyle"}>Login:</label><br/>
                    <input className={"inputStyle"}onChange={(v)=>setLogin(v.target.value)}  /><br/>
                    {loginMessage && <p className={"errorLabel"}> {loginMessage} </p>}
                </div>

                <div >
                    <label className={"labelStyle"}>Hasło:</label><br/>
                    <input type="password" className={"inputStyle"}onChange={(v)=>setHaslo(v.target.value)} /><br/>
                    {hasloMessage && <p className={"errorLabel"}> {hasloMessage} </p>}
                </div>
                <div >
                    <label className={"labelStyle"}>Potwierdź hasło:</label><br/>
                    <input type="password" className={"inputStyle"}onChange={(v)=>setPothas(v.target.value)}/><br/>
                </div>
                <button className="button" onClick={sendFrom}>Zarejestruj</button>
            </div> </div>


    );
};