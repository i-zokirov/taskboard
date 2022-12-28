import React, { FunctionComponent } from "react";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuComponent from "./MenuComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuProps } from "../interfaces";
const ProfileMenu: FunctionComponent<MenuProps> = (props) => {
    const { open, anchorEl, handleClose } = props;
    return (
        <MenuComponent
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
        >
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>Account</ListItemText>
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                <ListItemText>My Team</ListItemText>
            </ListItemButton>
            <Divider />
            <ListItemButton>
                <ListItemIcon>
                    <SettingsSuggestIcon />
                </ListItemIcon>
                <ListItemText>Preferences</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
            </ListItemButton>
        </MenuComponent>
    );
};

export default ProfileMenu;
