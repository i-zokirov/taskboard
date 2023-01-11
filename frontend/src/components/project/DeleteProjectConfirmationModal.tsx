import {
    Box,
    Button,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import { ModalProps } from "../../interfaces";
import TransitionModal from "../custom/TransitionModal";
import { useAppSelector, useDeleteProject } from "../../reduxApp/hooks";
import { icons } from "../../assets/icons";

const DeleteProjectConfirmationModal: React.FC<ModalProps> = (props) => {
    const projectSettings = useAppSelector((state) => state.projectSettings);
    const deleteProject = useDeleteProject();
    const handleDelete = () => {
        deleteProject({ projectId: projectSettings.projectData!._id });
        if (props.closeSettingsMenu) props.closeSettingsMenu();
        if (props.onClose) props.onClose();
    };
    return (
        <TransitionModal {...props}>
            <Box width={400} height={250} padding="15px 20px 20px 20px">
                <Box
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    <Typography variant="h6" fontWeight={"bold"}>
                        Delete Project
                    </Typography>
                    <Tooltip title="Close">
                        <IconButton>{icons.close()}</IconButton>
                    </Tooltip>
                </Box>
                <Divider />
                <Box padding={"10px"}>
                    <Typography variant="h6">Caution!</Typography>
                    <Typography>
                        Deleting project will delete all tasks, comments,
                        attachments and activity linked to this project.
                    </Typography>
                </Box>
                <Divider />
                <Box padding={"10px"} textAlign="right">
                    <Button
                        variant="outlined"
                        color="info"
                        sx={{ marginRight: "5px" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default DeleteProjectConfirmationModal;
