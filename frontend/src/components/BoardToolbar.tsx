import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Badge, Box, IconButton } from "@mui/material";
import { BoardToolbarProps } from "../interfaces";
import ProjectSelector from "./ProjectSelector";

const BoardToolbar: React.FC<BoardToolbarProps> = (props) => {
    return (
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
    );
};

export default BoardToolbar;
