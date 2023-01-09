import React, { FunctionComponent, useState } from "react";
import { Menu, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { MenuProps } from "../interfaces";
import { icons } from "../assets/icons";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "../assets/theme";
import AddProjectModal from "./AddProjectModal";
const theme = createTheme(themeOptions);
const ProjectAddMenu: FunctionComponent<MenuProps> = (props) => {
    const { open, anchorEl, handleClose } = props;

    const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

    const handleNewProjectModalState = () => {
        setOpenNewProjectModal((prev) => !prev);
        if (handleClose) handleClose();
    };
    return (
        <ThemeProvider theme={theme}>
            <AddProjectModal
                open={openNewProjectModal}
                onClose={handleNewProjectModalState}
            />
            <Menu
                id="project-add-positioned-menu"
                aria-labelledby="project-add-positioned-button"
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
                <MenuItem
                    sx={{
                        margin: "3px",
                        width: 240,
                        maxWidth: "100%",
                        alignItems: "center",
                    }}
                    onClick={handleNewProjectModalState}
                >
                    <ListItemIcon> {icons.add()}</ListItemIcon>
                    <ListItemText> New Project...</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{
                        margin: "3px",
                        width: 240,
                        maxWidth: "100%",
                        alignItems: "center",
                    }}
                >
                    <ListItemIcon> {icons.uploadfile()}</ListItemIcon>
                    <ListItemText> Import...</ListItemText>
                </MenuItem>
            </Menu>
        </ThemeProvider>
    );
};

export default ProjectAddMenu;
