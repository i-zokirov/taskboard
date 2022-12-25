import { nanoid } from "nanoid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LockResetIcon from "@mui/icons-material/LockReset";
import { taskItemsFromBackend } from "./datasets";
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

export const kanbancolumns = {
    [nanoid()]: {
        name: "Open",
        color: "#d93651",
        taskItems: taskItemsFromBackend,
        icon: <TipsAndUpdatesIcon sx={{ color: "#fff" }} />,
    },
    [nanoid()]: {
        name: "In Progress",
        color: "#00aaff",
        taskItems: [],
        icon: <AutorenewIcon sx={{ color: "#fff" }} />,
    },
    [nanoid()]: {
        name: "Pending",
        color: "#ff9f1a",
        taskItems: [],
        icon: <LockResetIcon sx={{ color: "#fff" }} />,
    },
    [nanoid()]: {
        name: "Completed",
        color: "#47cc8a",
        taskItems: [],
        icon: <OfflinePinIcon sx={{ color: "#fff" }} />,
    },
};
