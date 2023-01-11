import React, { FunctionComponent } from "react";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    Tooltip,
} from "@mui/material";
import MenuComponent from "../custom/MenuComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuProps } from "../../interfaces";
import { useAppDispatch } from "../../reduxApp/hooks";
import { logout } from "../../reduxApp/features/auth/authSlice";

const ProfileMenu: FunctionComponent<MenuProps> = (props) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("userData");
    };
    return (
        <MenuComponent {...props}>
            <Tooltip title="Not Implemented" placement="left">
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>Account</ListItemText>
                </ListItemButton>
            </Tooltip>
            <Tooltip title="Not Implemented" placement="left">
                <ListItemButton>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText>My Team</ListItemText>
                </ListItemButton>
            </Tooltip>
            <Divider />
            <Tooltip title="Not Implemented" placement="left">
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsSuggestIcon />
                    </ListItemIcon>
                    <ListItemText>Preferences</ListItemText>
                </ListItemButton>
            </Tooltip>
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
            </ListItemButton>
        </MenuComponent>
    );
};

export default ProfileMenu;
