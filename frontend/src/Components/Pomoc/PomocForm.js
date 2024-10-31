import React,{ useState } from "react";
import axios from "axios";
import "./PomocForm.css";


export default function PomocForm(){
    axios.defaults.withCredentials = true;


    return(
        <div className={"pomocny"}>
            <h1 className={"PomocH1"}>Pomoc można uzyskać pod numerem telefonu:<br/>+48 999 888 777</h1>
            <h1 className={"PomocH1"}>Najczęściej zadawane pytania:</h1>
            <h2 className={"PomocH2"}>*Kto może się ubiegać o pożyczkę?</h2>
            <h3 className={"PomocH3"}>Pożyczka  przeznaczona jest dla osób, które posiadają udokumentowany dochód.
                Honorujemy takie dochody jak umowa o pracę, zlecenia, o dzieło, emeryturę, rentę, świadczenie przedemerytalne.</h3>
            <h2 className={"PomocH2"}>*Jak wziąć pożyczkę pierwszy raz?</h2>
            <h3 className={"PomocH3"}>Wystarczy wniosek o pożyczkę, który znajduje się na naszej stronie internetowej, poprosimy Cię o podanie
                podstawowych danych z dowodu osobistego, oraz danych dotyczących źródła Twojego dochodu. Jeżeli robisz to
                pierwszy raz założymy dla Ciebie konto, w którym będziesz mógł śledzić wszystkie informacje dotyczące Twojej pożyczki.</h3>
            <h2 className={"PomocH2"}>*Pierwsza pożyczka?</h2>
            <h3 className={"PomocH3"}>U nas za pierwszą pożyczkę nie zapłacisz ani złotówki.
            Oddajesz dokładnie taką samą kwotę, którą pożyczasz.</h3>
            <h2 className={"PomocH2"}>*Decyzja.</h2>
            <h3 className={"PomocH3"}>O decyzji zostaniesz poinformowany w formie wiadomości e-mail, dodatkowo możesz na bieżąco sprawdzać status swojej pożyczki
                poprzez panel Klienta. Cenimy Twój czas, dlatego zawsze najwyższym priorytetem jest
                dla nas czas dołożenie starań by odpowiedź na złożony wniosek była przekazana jak najszybciej! Gotówkę możesz
                pozyskać już w 15 minut od zawarcia umowy pożyczki.</h3>
            <h2 className={"PomocH2"}>*Czy mogę ubiegać się o kolejną pożyczkę, kiedy poprzednia trwa?</h2>
            <h3 className={"PomocH3"}>Nie.Abyś mógł skorzystać z nowej oferty wymagamy spłaty poprzedniej pożyczki.</h3>
            <h2 className={"PomocH2"}>*Na jaki rachunek należy wpłacać raty pożyczki?</h2>
            <h3 className={"PomocH3"}>Informacje o numerze naszego konta do spłaty pożyczki znajdują się na umowie pożyczki,
                którą znajdziesz w swoim Panelu Klienta oraz poczcie e-mail.</h3>
            <h2 className={"PomocH2"}>*Nie wiem gdzie znajduje się moja umowa i informacje o pożyczce.</h2>
            <h3 className={"PomocH3"}>Wszystkie dokumenty dotyczące Twojego zobowiązania znajdują się w zakłądce Twojego profilu.</h3>
        </div>

    )}