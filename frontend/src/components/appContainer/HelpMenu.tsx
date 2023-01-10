import React, { FunctionComponent } from "react";
import { ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import MenuComponent from "../custom/MenuComponent";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { MenuProps } from "../../interfaces";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const HelpMenu: FunctionComponent<MenuProps> = (props) => {
    const { open, anchorEl, handleClose } = props;
    return (
        <MenuComponent
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
        >
            <ListItemButton>
                <ListItemIcon>
                    <KeyboardIcon />
                </ListItemIcon>
                <ListItemText>Keyboard shortcuts</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <TipsAndUpdatesIcon />
                </ListItemIcon>
                <ListItemText>What`s new</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <RecordVoiceOverIcon />
                </ListItemIcon>
                <ListItemText>Ask the community</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText>Help</ListItemText>
            </ListItemButton>
        </MenuComponent>
    );
};

export default HelpMenu;
