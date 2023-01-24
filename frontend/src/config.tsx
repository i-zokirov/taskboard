import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const drawerWidth = 240;

export const appBarMenuOptions = [
    { name: "Dashboard", url: "/app", icon: <DashboardIcon /> },
    { name: "View Agenda", url: "/agenda", icon: <ViewAgendaIcon /> },
    { name: "Reports", url: "/reports", icon: <AssessmentIcon /> },
];

export const toolbarIconButtons = [
    {
        title: "Add task",
        icon: <AddCircleOutlineIcon />,
    },
    {
        title: "Notifications",
        icon: <NotificationsIcon />,
    },
    {
        title: "Search",
        icon: <SearchIcon />,
    },
    {
        title: "Help",
        icon: <HelpOutlineIcon />,
    },
    {
        title: "Account",
        icon: <AccountCircle />,
    },
];

export const socketSever = "https://taskboard-mchv.onrender.com";
export const localhost = "http://localhost:5000";
export const baseUrl = "";
