import ZdolnoscKredFrom from "./Components/ZdolnoscKredytowa/ZdolnoscKredForm"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import KredytForm from "./Components/Kredyt/KredytForm"
import KontaktForm from "./Components/Kontakt/KontaktForm";
import PomocForm from "./Components/Pomoc/PomocForm";
import RegulaminForm from "./Components/Regulamin/RegulaminForm";
import WarunkiForm from "./Components/Kontakt/Warunki";
import NavBar from "./Components/NavBar/NavBar";
import RejForm from "./Components/Rejestracja/RejForm";
import LogForm from "./Components/Logowanie/LogForm";
import ProfilForm from "./Components/Profil/ProfilForm";
import DaneKredytowe from "./Components/DaneKredytowe/DaneKredytowe"
import Logout from "./Components/Logout"
import PanelUzyForm from "./Components/PanelUzyForm/PanelUzyFomr"
import SplacKredyt from "./Components/SplacanieKredytu/SplacanieKredytu"

function App() {
  return (
      <div className="App">
          <Router>
              <NavBar/>
              <Routes>
                  <Route path="/" exact element/>
                  <Route path={"/formularz-zdolnosci-kredytowej"} element={<ZdolnoscKredFrom/>}/>
                  <Route path={"/wydarzenia"} element={<KredytForm/>}/>
                  <Route path={"/profil"} element={<KontaktForm/>}/>
                  <Route path={"/pomoc"} element={<PomocForm/>}/>
                  <Route path={"/regulamin"} element={<RegulaminForm/>}/>
                  <Route path={"/warunki"} element={<WarunkiForm/>}/>
                  <Route path={"/Register"} element={<RejForm/>}/>
                  <Route path={"/Login"} element={<LogForm/>}/>
                  <Route path={"/profil"} element={<ProfilForm/>}/>
                  <Route path={"/kredyt-podsumowanie"} element={<DaneKredytowe/>}/>
                  <Route path={"/Logout"} element={<Logout/>}/>
                  <Route path={"/PanelUzy"} element={<PanelUzyForm/>}/>
                  <Route path={"/splacKredyt/:idPozyczki"} element={<SplacKredyt/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;