import React from "react";
import { MenuProps } from "../../interfaces";
import MenuComponent from "../custom/MenuComponent";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    Tooltip,
} from "@mui/material";
import { icons } from "../../assets/icons";
const settingsMenuOptions = [
    {
        title: "Deleted tasks",
        icon: "delete",
        action: () => {},
    },
    {
        title: "Archived tasks",
        icon: "archive",
        action: () => {},
    },
    {
        title: "Duplicate",
        icon: "duplicate",
        action: () => {},
    },
    {
        title: "Archive project",
        icon: "archive",
        action: () => {},
    },
    {
        title: "Print project",
        icon: "print",
        action: () => {},
    },
    {
        title: "Export time tracking",
        icon: "timer",
        action: () => {},
    },
];

const ProjectSettingsMenu: React.FC<MenuProps> = (props) => {
    return (
        <MenuComponent {...props}>
            {settingsMenuOptions.map((option, index) => (
                <Box key={index}>
                    <Tooltip title={"Not implemented"} placement="left">
                        <ListItemButton>
                            <ListItemIcon>{icons[option.icon]()}</ListItemIcon>
                            <ListItemText>{option.title}</ListItemText>
                        </ListItemButton>
                    </Tooltip>
                    {index % 2 !== 0 &&
                        settingsMenuOptions.length !== index + 1 && <Divider />}
                </Box>
            ))}
        </MenuComponent>
    );
};

export default ProjectSettingsMenu;
