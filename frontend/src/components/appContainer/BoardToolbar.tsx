import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Box, IconButton, Tooltip, Divider } from "@mui/material";
import { BoardToolbarProps } from "../../interfaces";
import ProjectSelector from "../project/ProjectSelector";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps } from "../../interfaces";
import { styled } from "@mui/material/styles";
import { toolbarIconButtons } from "../../config";
import ProfileMenu from "./ProfileMenu";
import AddTaskModal from "../tasks/AddTaskModal";
import HelpMenu from "./HelpMenu";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const BoardToolbar: React.FC<BoardToolbarProps> = (props) => {
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [helpAnchorEl, setHelpAnchorEl] = React.useState<null | HTMLElement>(
        null
    );

    const [openAddTaskModal, setOpenAddTaskModal] = React.useState(false);
    const openProfileMenu = Boolean(profileMenuAnchorEl);
    const openHelpMenu = Boolean(helpAnchorEl);
    const handleOpenHelpMenu = (e: React.MouseEvent<HTMLElement>) => {
        setHelpAnchorEl(e.currentTarget);
    };
    const handleCloseHelpMenu = () => {
        setHelpAnchorEl(null);
    };
    const handleModalState = () => {
        setOpenAddTaskModal((prev) => !prev);
    };
    const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const btnclicked = e.currentTarget
            .getAttribute("data-buttonclicked")
            ?.split(" ")
            ?.join("");

        switch (btnclicked) {
            case "account":
                handleOpenProfileMenu(e);
                break;
            case "addtask":
                handleModalState();
                break;
            case "help":
                handleOpenHelpMenu(e);
                break;
        }
    };
    return (
        <React.Fragment>
            <ProfileMenu
                open={openProfileMenu}
                anchorEl={profileMenuAnchorEl}
                handleClose={handleCloseProfileMenu}
            />
            <HelpMenu
                open={openHelpMenu}
                anchorEl={helpAnchorEl}
                handleClose={handleCloseHelpMenu}
            />
            <AddTaskModal open={openAddTaskModal} onClose={handleModalState} />
            <AppBar
                position="fixed"
                open={props.open}
                sx={{ background: "#fff", boxShadow: "none" }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(props.open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ProjectSelector />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: { md: "flex" },
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <button className="btn btn-circular">Share</button>
                        {toolbarIconButtons.map((btn, indx) => (
                            <React.Fragment key={btn.title}>
                                <Tooltip title={btn.title}>
                                    <IconButton
                                        onClick={handleButtonClick}
                                        size="large"
                                        data-buttonclicked={btn.title.toLowerCase()}
                                        aria-label={`${btn.title} button`}
                                        sx={{
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                        }}
                                    >
                                        {btn.icon}
                                    </IconButton>
                                </Tooltip>
                                {indx !== toolbarIconButtons.length - 1 && (
                                    <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        flexItem
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default BoardToolbar;
