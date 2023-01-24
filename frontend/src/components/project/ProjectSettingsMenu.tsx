import React, { useState } from "react";
import { MenuProps } from "../../interfaces";
import MenuComponent from "../custom/MenuComponent";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    Tooltip,
    Button,
} from "@mui/material";
import { icons } from "../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../reduxApp/hooks";
import DeleteProjectConfirmationModal from "./DeleteProjectConfirmationModal";
import { openShareProjectModal } from "../../reduxApp/features/modals/modal-slice";
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
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
        useState(false);
    const projectSettings = useAppSelector((state) => state.projectSettings);
    const userData = useAppSelector((state) => state.auth.userData);

    const deleteConfirmationModal = () => {
        setOpenDeleteConfirmationModal((prev) => !prev);
    };
    const dispatch = useAppDispatch();
    const handleShareClick = () => {
        if (props.handleClose) props.handleClose();
        dispatch(openShareProjectModal());
    };
    return (
        <MenuComponent {...props}>
            <DeleteProjectConfirmationModal
                open={openDeleteConfirmationModal}
                onClose={deleteConfirmationModal}
                closeSettingsMenu={props.handleClose}
            />
            {settingsMenuOptions.map((option, index) => (
                <Box key={index}>
                    <Tooltip title={"Not implemented"} placement="left">
                        <ListItemButton>
                            <ListItemIcon>{icons[option.icon]()}</ListItemIcon>
                            <ListItemText>{option.title}</ListItemText>
                        </ListItemButton>
                    </Tooltip>
                    {index % 2 !== 0 && <Divider />}
                </Box>
            ))}
            <Box textAlign={"center"} paddingBottom="10px" paddingTop="10px">
                <Box paddingBottom="5px">
                    <Button fullWidth onClick={handleShareClick}>
                        Share
                    </Button>
                </Box>

                <Box>
                    <Button
                        fullWidth
                        color="error"
                        disabled={
                            projectSettings.projectData?.owner._id !==
                            userData?._id
                        }
                        onClick={deleteConfirmationModal}
                    >
                        Delete Project
                    </Button>
                </Box>
            </Box>
        </MenuComponent>
    );
};

export default ProjectSettingsMenu;
