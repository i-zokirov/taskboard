import React, { ChangeEvent, useState } from "react";
import { Typography, Box, TextField, Avatar, Tooltip } from "@mui/material";
import moment from "moment";
import { useAppSelector, useUpdateProject } from "../../../reduxApp/hooks";
import { colors } from "../../../assets/theme";
import { icons } from "../../../assets/icons";
import { getRandomInt } from "../../../utils";
import InfoSectionIconMenu from "./InfoSectionIconMenu";

const color = colors[getRandomInt(colors.length)].colorCode;
const InfoSection = () => {
    const projectSettings = useAppSelector((state) => state.projectSettings);
    const [titleValue, setTitleValue] = useState(
        projectSettings.projectData?.title || ""
    );
    const [descriptionValue, setDescriptionValue] = useState(
        projectSettings.projectData?.description || ""
    );

    const [iconsAnchorEl, setIconsAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const openIconsMenu = Boolean(iconsAnchorEl);

    const updateProject = useUpdateProject();
    if (projectSettings.open) {
        const handleSubmit = () => {};
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setTitleValue(e.currentTarget.value);
        };
        const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescriptionValue(e.currentTarget.value);
        };

        const handleCloseIconsMenu = () => {
            setIconsAnchorEl(null);
        };
        const handleOpenIconsMenu = (e: React.MouseEvent<HTMLElement>) => {
            setIconsAnchorEl(e.currentTarget);
        };
        const handleUpdate = () => {
            if (
                titleValue !== projectSettings.projectData?.title ||
                descriptionValue !== projectSettings.projectData.description
            ) {
                updateProject({
                    updates: {
                        title: titleValue,
                        description: descriptionValue,
                    },
                });
            }
        };
        return (
            <Box sx={{ padding: "10px 20px 20px 20px" }}>
                <InfoSectionIconMenu
                    open={openIconsMenu}
                    anchorEl={iconsAnchorEl}
                    handleClose={handleCloseIconsMenu}
                />
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
                        <Box
                            display={"flex"}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box sx={{ width: "20%" }}>
                                <Tooltip
                                    title="Change project icon"
                                    onClick={handleOpenIconsMenu}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor:
                                                projectSettings.projectData
                                                    ?.color &&
                                                projectSettings.projectData
                                                    ?.color,
                                            width: 56,
                                            height: 56,
                                        }}
                                    >
                                        {projectSettings.projectData?.icon
                                            ? icons[
                                                  projectSettings.projectData
                                                      ?.icon
                                              ]({ width: 44, height: 44 })
                                            : icons.folder({
                                                  width: 44,
                                                  height: 44,
                                              })}
                                    </Avatar>
                                </Tooltip>
                            </Box>
                            <Box sx={{ width: "80%" }}>
                                <TextField
                                    margin="normal"
                                    id="project-title"
                                    label="Project Title"
                                    name="title"
                                    fullWidth
                                    value={titleValue}
                                    autoFocus
                                    onChange={handleInputChange}
                                    onBlur={handleUpdate}
                                />
                            </Box>
                        </Box>
                        <br />

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
                            onBlur={handleUpdate}
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
                                {projectSettings.projectData?.createdBy?.name
                                    ? projectSettings.projectData?.createdBy
                                          ?.name
                                    : projectSettings.projectData?.owner?.name}
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

export default InfoSection;
