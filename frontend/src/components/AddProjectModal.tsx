import { Typography, Box, TextField } from "@mui/material";
import React from "react";
import { ModalProps } from "../interfaces";
import { useCreateProject } from "../reduxApp/hooks";

import TransitionModal from "./TransitionModal";

const AddProjectModal: React.FunctionComponent<ModalProps> = (props) => {
    const { open, onClose } = props;
    const createProject = useCreateProject();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body = {
            title: formData.get("title")!.toString(),
            description: formData.get("description")!.toString(),
        };
        if (body.title && body.description) {
            createProject({ token: "", project: body });
        }
        onClose();
    };
    return (
        <TransitionModal open={open} onClose={onClose} width={400} height={350}>
            <Box padding={"30px 20px"}>
                <Typography variant="h5" fontWeight={"550"} color={"#3268c5"}>
                    Create New Project
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="project-title"
                        label="Project Title"
                        name="title"
                        autoFocus={true}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        id="description"
                        minRows={2}
                        maxRows={5}
                    />

                    <button type="submit" className="btn">
                        Create Project
                    </button>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default AddProjectModal;
