import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const drawerWidth = 240;

export const appBarMenuOptions = [
    { name: "Dashboard", url: "/app", icon: <DashboardIcon /> },
    { name: "View Agenda", url: "/agenda", icon: <ViewAgendaIcon /> },
    { name: "Reports", url: "/reports", icon: <AssessmentIcon /> },
];
