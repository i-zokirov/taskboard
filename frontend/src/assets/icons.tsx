import SearchIcon from "@mui/icons-material/Search";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BugReportIcon from "@mui/icons-material/BugReport";
import ListIcon from "@mui/icons-material/List";
import StarsIcon from "@mui/icons-material/Stars";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CachedIcon from "@mui/icons-material/Cached";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import LanguageIcon from "@mui/icons-material/Language";
import MonitorIcon from "@mui/icons-material/Monitor";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SaveIcon from "@mui/icons-material/Save";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WatchIcon from "@mui/icons-material/Watch";
import DevicesIcon from "@mui/icons-material/Devices";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AppleIcon from "@mui/icons-material/Apple";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AndroidIcon from "@mui/icons-material/Android";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PestControlIcon from "@mui/icons-material/PestControl";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import SubjectIcon from "@mui/icons-material/Subject";
import PrintIcon from "@mui/icons-material/Print";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IconDictionary } from "../types";
import { SxProps } from "@mui/material";

export const icons: IconDictionary = {
    // productivity workflow

    celebration: (sx: SxProps | undefined) => (
        <CelebrationIcon sx={{ ...sx }} />
    ),
    checkcircle: (sx: SxProps | undefined) => (
        <CheckCircleOutlineIcon sx={{ ...sx }} />
    ),
    barchart: (sx: SxProps | undefined) => <BarChartIcon sx={{ ...sx }} />,
    movetoinbox: (sx: SxProps | undefined) => (
        <MoveToInboxIcon sx={{ ...sx }} />
    ),
    tipsandupdates: (sx: SxProps | undefined) => (
        <TipsAndUpdatesIcon sx={{ ...sx }} />
    ),
    colorlens: (sx: SxProps | undefined) => <ColorLensIcon sx={{ ...sx }} />,
    editicon: (sx: SxProps | undefined) => <ModeEditIcon sx={{ ...sx }} />,
    conversation: (sx: SxProps | undefined) => (
        <QuestionAnswerIcon sx={{ ...sx }} />
    ),
    calendarmonth: (sx: SxProps | undefined) => (
        <CalendarMonthIcon sx={{ ...sx }} />
    ),
    schedule: (sx: SxProps | undefined) => <ScheduleIcon sx={{ ...sx }} />,
    searchicon: (sx: SxProps | undefined) => <SearchIcon sx={{ ...sx }} />,
    bugreport: (sx: SxProps | undefined) => <BugReportIcon sx={{ ...sx }} />,
    thumbup: (sx: SxProps | undefined) => <ThumbUpOffAltIcon sx={{ ...sx }} />,
    starticon: (sx: SxProps | undefined) => <StarsIcon sx={{ ...sx }} />,
    listicon: (sx: SxProps | undefined) => <ListIcon sx={{ ...sx }} />,
    refresh: (sx: SxProps | undefined) => <CachedIcon sx={{ ...sx }} />,
    pausecircle: (sx: SxProps | undefined) => (
        <PauseCircleOutlineIcon sx={{ ...sx }} />
    ),
    globe: (sx: SxProps | undefined) => <LanguageIcon sx={{ ...sx }} />,
    bug: (sx: SxProps | undefined) => <PestControlIcon sx={{ ...sx }} />,

    // technology
    monitor: (sx: SxProps | undefined) => <MonitorIcon sx={{ ...sx }} />,
    laptop: (sx: SxProps | undefined) => <LaptopMacIcon sx={{ ...sx }} />,
    smartphone: (sx: SxProps | undefined) => <SmartphoneIcon sx={{ ...sx }} />,
    folder: (sx: SxProps | undefined) => <FolderOpenIcon sx={{ ...sx }} />,
    saveicon: (sx: SxProps | undefined) => <SaveIcon sx={{ ...sx }} />,
    gameconsole: (sx: SxProps | undefined) => (
        <VideogameAssetIcon sx={{ ...sx }} />
    ),
    camera: (sx: SxProps | undefined) => <CameraAltIcon sx={{ ...sx }} />,
    watch: (sx: SxProps | undefined) => <WatchIcon sx={{ ...sx }} />,
    devices: (sx: SxProps | undefined) => <DevicesIcon sx={{ ...sx }} />,
    mail: (sx: SxProps | undefined) => <MailOutlineIcon sx={{ ...sx }} />,
    apple: (sx: SxProps | undefined) => <AppleIcon sx={{ ...sx }} />,
    cloud: (sx: SxProps | undefined) => <CloudQueueIcon sx={{ ...sx }} />,
    at: (sx: SxProps | undefined) => <AlternateEmailIcon sx={{ ...sx }} />,
    android: (sx: SxProps | undefined) => <AndroidIcon sx={{ ...sx }} />,
    whatsapp: (sx: SxProps | undefined) => <WhatsAppIcon sx={{ ...sx }} />,

    // rest
    addcircle: (sx: SxProps | undefined) => (
        <AddCircleOutlineIcon sx={{ ...sx }} />
    ),
    add: (sx: SxProps | undefined) => <AddIcon sx={{ ...sx }} />,
    close: (sx: SxProps | undefined) => <CloseIcon sx={{ ...sx }} />,
    archive: (sx: SxProps | undefined) => <ArchiveIcon sx={{ ...sx }} />,
    subject: (sx: SxProps | undefined) => <SubjectIcon sx={{ ...sx }} />,
    print: (sx: SxProps | undefined) => <PrintIcon sx={{ ...sx }} />,
    rocket: (sx: SxProps | undefined) => <RocketLaunchIcon sx={{ ...sx }} />,
    delete: (sx: SxProps | undefined) => <DeleteOutlineIcon sx={{ ...sx }} />,
    check: (sx: SxProps | undefined) => <CheckIcon sx={{ ...sx }} />,
    uploadfile: (sx: SxProps | undefined) => <UploadFileIcon sx={{ ...sx }} />,
};

export const productivityIcons = [
    "celebration",
    "rocket",
    "checkcircle",
    "barchart",
    "movetoinbox",
    "tipsandupdates",
    "colorlens",
    "editicon",
    "conversation",
    "calendarmonth",
    "schedule",
    "searchicon",
    "bugreport",
    "thumbup",
    "starticon",
    "listicon",
    "refresh",
    "pausecircle",
    "globe",
    "bug",
    "delete",
    "uploadfile",
];

export const technologyIcons = [
    "monitor",
    "laptop",
    "smartphone",
    "folder",
    "saveicon",
    "gameconsole",
    "camera",
    "watch",
    "devices",
    "mail",
    "apple",
    "cloud",
    "at",
    "android",
    "whatsapp",
];
