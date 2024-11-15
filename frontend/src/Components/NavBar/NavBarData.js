import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import Register from '@mui/icons-material/AppRegistration';
import Loan from '@mui/icons-material/CreditScore';
import ContactsIcon from '@mui/icons-material/Contacts';
import HelpIcon from '@mui/icons-material/Help';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const NavBarData = [
    {
        name: "Strona Główna",
        img: <HomeIcon/>,
        link: "/"
    },
    {
        name: "Wydarzenia",
        img: <Loan/>,
        link: "/wydarzenia",
    },
    {
        name: "Profil",
        img: <ContactsIcon/>,
        link: "/profil",
    },
    {
        name: "Login",
        img: <LoginIcon/>,
        link: "/Login"
    },
    {
        name: "Rejestracja",
        img: <Register/>,
        link: "/Register"
    }
];

export const NavBarDataUser = [
    {
        name: "Strona Główna",
        img: <HomeIcon/>,
        link: "/"
    },
    {
        name: "Wydarzenia",
        img: <Loan/>,
        link: "/wydarzenia",
    },
    {
        name: "Profil",
        img: <ContactsIcon/>,
        link: "/profil",
    },
    {
        name: "Logout",
        img: <LogoutIcon/>,
        link: "/Logout"
    }
];