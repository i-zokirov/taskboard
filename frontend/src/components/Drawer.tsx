import React from "react";
import { Drawer as MUIDrawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { DrawerHeader } from "../components/Main";
import { appBarMenuOptions } from "../config";
import { Link } from "react-router-dom";
import { drawerWidth } from "../config";
import { DrawerProps } from "../interfaces";

const Drawer: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
    const theme = useTheme();
    return (
        <MUIDrawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {appBarMenuOptions.map((item) => (
                    <ListItem disablePadding key={item.name}>
                        <ListItemButton LinkComponent={Link} href={item.url}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <RocketLaunchIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Projects"} />
                    </ListItemButton>
                    <IconButton sx={{ marginRight: "5px" }}>
                        <MoreHorizIcon />
                    </IconButton>
                </ListItem>
                {["Project 1", "Project 2", "Project 3"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </MUIDrawer>
    );
};

export default Drawer;
