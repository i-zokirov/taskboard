import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, Box, IconButton, Tooltip, Divider } from "@mui/material";
import { BoardToolbarProps } from "../interfaces";
import ProjectSelector from "./ProjectSelector";
import MuiAppBar from "@mui/material/AppBar";
import { AppBarProps } from "../interfaces";
import { styled } from "@mui/material/styles";
import { toolbarIconButtons } from "../config";

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
                <ProjectSelector
                    project={props.project}
                    projects={props.projects}
                    handleChange={props.handleChange}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{
                        display: { md: "flex" },
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <button className="btn-circular">Share</button>
                    {toolbarIconButtons.map((btn, indx) => (
                        <React.Fragment key={btn.title}>
                            <Tooltip title={btn.title}>
                                <IconButton
                                    size="large"
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
                    {/* 
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={""}
                        aria-haspopup="true"
                    >
                        <AccountCircle />
                    </IconButton> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default BoardToolbar;
