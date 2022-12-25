import React, { useState } from "react";
import { Paper, Typography, Stack, Box, IconButton, Chip } from "@mui/material";
import { TaskCardProps } from "../interfaces";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TaskCard: React.FunctionComponent<TaskCardProps> = (props) => {
    const { title, badge, completed } = props;
    const [elevation, setElevation] = useState(0);
    const [opacity, setOpacity] = useState(completed ? 0.5 : 1);
    // const nodeRef = useRef(null);
    const handleMouseOver = (e: any) => {
        e.preventDefault();
        setElevation(3);
        setOpacity(1);
    };

    const handleMouseLeave = (e: any) => {
        e.preventDefault();
        setElevation(0);
        setOpacity(completed ? 0.5 : 1);
    };
    return (
        <Box onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <Paper
                elevation={elevation}
                sx={{
                    marginBottom: "10px",
                    borderRadius: "10px",
                    opacity,
                }}
            >
                {completed && (
                    <Box
                        sx={{
                            background: "#47cc8a",
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px",
                            padding: "5px",
                            color: "white",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <IconButton disabled={true}>
                            <CheckCircleIcon sx={{}} />
                        </IconButton>
                        <Typography variant="subtitle2">Completed</Typography>
                    </Box>
                )}

                <Box sx={{ padding: "10px" }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        <Box
                            display={"flex"}
                            justifyContent="space-between"
                            alignItems={"center"}
                            width="100%"
                        >
                            <Typography
                                sx={{
                                    textDecoration: completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {title}
                            </Typography>
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                        </Box>
                        {badge && (
                            <Box>
                                <Chip
                                    label="high"
                                    size="small"
                                    color={"error"}
                                />
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default TaskCard;
