import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Badge, Box, IconButton } from "@mui/material";
import { BoardToolbarProps } from "../interfaces";
import ProjectSelector from "./ProjectSelector";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps } from "../interfaces";
import { styled } from "@mui/material/styles";

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
    return (
        <AppBar position="fixed" open={props.open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(props.open && { display: "none" }) }}
                >
                    <MenuIcon />
                </IconButton>
                <ProjectSelector
                    project={props.project}
                    projects={props.projects}
                    handleChange={props.handleChange}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { md: "flex" } }}>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={""}
                        aria-haspopup="true"
                        // onClick={""}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default BoardToolbar;
