import React, { useState, FunctionComponent } from "react";
import {
    Menu,
    ListItemIcon,
    ListItemText,
    Typography,
    MenuItem,
} from "@mui/material";
import { MenuProps } from "../interfaces";
import { icons } from "../assets/icons";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "../assets/theme";
const theme = createTheme(themeOptions);
const projectTypeSelectionOptions = [
    {
        title: "Active Projects",
        icon: "rocket",
    },
    {
        title: "Archived Projects",
        icon: "archive",
    },
    {
        title: "Deleted Projects",
        icon: "archive",
    },
];
const ProjectTypeSelectionMenu: FunctionComponent<MenuProps> = (props) => {
    const { open, anchorEl, handleClose } = props;
    const [selected, setSelected] = useState<string | null>("Active Projects");
    const handleMenuItemClick = (e: React.MouseEvent<HTMLElement>) => {
        const title = e.currentTarget.getAttribute("data-title");
        setSelected(title);
        if (handleClose) handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Menu
                id="project-type-selection-positioned-menu"
                aria-labelledby="project-type-selection-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {projectTypeSelectionOptions.map(({ icon, title }, index) => (
                    <MenuItem
                        sx={{
                            margin: "3px",
                            width: 240,
                            maxWidth: "100%",
                            alignItems: "center",
                        }}
                        key={index}
                        data-title={title}
                        onClick={handleMenuItemClick}
                    >
                        <ListItemIcon> {icons[icon]()}</ListItemIcon>
                        <ListItemText> {title} </ListItemText>
                        {selected === title && (
                            <Typography variant="body2">
                                {icons.check()}
                            </Typography>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </ThemeProvider>
    );
};

export default ProjectTypeSelectionMenu;
