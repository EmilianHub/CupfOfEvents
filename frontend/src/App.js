import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import RejForm from "./Components/Rejestracja/RejForm";
import LogForm from "./Components/Logowanie/LogForm";
import ProfilForm from "./Components/Profil/ProfilForm";
import Logout from "./Components/Logout"
import PanelUzyForm from "./Components/PanelUzyForm/PanelUzyFomr"
import EventList from "./Components/Event/EventList";
import EventDetail from "./Components/Event/EventDetail";
import PaymentForm from './Components/Payment/PaymentForm'

function App() {
  return (
      <div className="App">
          <Router>
              <NavBar/>
              <Routes>
                  <Route path="/" exact element/>
                  <Route path={"/wydarzenia"} element={<EventList/>}/>
                  <Route path="/event/:eventName" element={<EventDetail />} />
                  <Route path="/payment/:eventName" element={<PaymentForm />} />
                  <Route path={"/Register"} element={<RejForm/>}/>
                  <Route path={"/Login"} element={<LogForm/>}/>
                  <Route path={"/profil"} element={<ProfilForm/>}/>
                  <Route path={"/Logout"} element={<Logout/>}/>
                  <Route path={"/PanelUzy"} element={<PanelUzyForm/>}/>
              </Routes>
          </Router>
      </div>
  );
}

export default App;