import React, {useEffect} from "react";
import {deleteCookies} from "./CookiesManager/CookiesManager";
import {useNavigate} from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();
    useEffect(() => {
        deleteCookies();
        navigate("/")
        window.location.reload(false)
    })
}
