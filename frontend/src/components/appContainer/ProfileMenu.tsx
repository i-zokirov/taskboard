import React, { FunctionComponent } from "react";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuComponent from "../custom/MenuComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuProps } from "../../interfaces";
import { useAppDispatch } from "../../reduxApp/hooks";
import { logout } from "../../reduxApp/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const ProfileMenu: FunctionComponent<MenuProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("userData");
        navigate("/login");
    };
    return (
        <MenuComponent {...props}>
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
            <ListItemButton LinkComponent={"a"} href="/login">
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
            </ListItemButton>
        </MenuComponent>
    );
};

export default ProfileMenu;
