import React, { ChangeEvent, useState } from "react";
import { Typography, Box, TextField } from "@mui/material";
import moment from "moment";
import { useAppSelector } from "../../../reduxApp/hooks";
import { lightdark } from "../../../assets/theme";
const ProjectDetailsModalInfoSection = () => {
    const projectSettings = useAppSelector((state) => state.projectSettings);
    const [titleValue, setTitleValue] = useState(
        projectSettings.projectData?.title || ""
    );
    const [descriptionValue, setDescriptionValue] = useState(
        projectSettings.projectData?.description || ""
    );
    if (projectSettings.open) {
        const handleSubmit = () => {};
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setTitleValue(e.currentTarget.value);
        };
        const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescriptionValue(e.currentTarget.value);
        };

        return (
            <Box sx={{ padding: "10px 20px 20px 20px" }}>
                <Box
                    sx={{
                        background: "#eff2f5",
                        borderRadius: "10px",
                        paddingBottom: "20px",
                    }}
                >
                    <Box
                        padding={"30px 30px"}
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="project-title"
                            label="Project Title"
                            name="title"
                            value={titleValue}
                            autoFocus
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            multiline
                            id="description"
                            minRows={2}
                            maxRows={5}
                            value={descriptionValue}
                            onChange={handleTextAreaChange}
                        />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        color="#9e9e9e"
                    >
                        <Box>
                            <Typography fontWeight={"bold"}>
                                Owned by
                            </Typography>
                            <Typography variant="subtitle2">
                                {projectSettings.projectData?.owner.name}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight={"bold"}>
                                Created on
                            </Typography>
                            <Typography variant="subtitle2">
                                {moment(
                                    new Date(
                                        projectSettings.projectData!.createdAt
                                    )
                                ).format("MMMM Do YYYY")}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight={"bold"}>
                                Last updated on
                            </Typography>
                            <Typography variant="subtitle2">
                                {moment(
                                    new Date(
                                        projectSettings.projectData!.updatedAt
                                    )
                                ).format("MMMM Do YYYY")}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight={"bold"}>
                                Created by
                            </Typography>
                            <Typography variant="subtitle2">
                                {projectSettings.projectData?.createdBy?.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    } else {
        return <></>;
    }
};

export default ProjectDetailsModalInfoSection;
