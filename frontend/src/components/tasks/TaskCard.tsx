import React, { useState } from "react";
import { Paper, Typography, Stack, Box, IconButton, Chip } from "@mui/material";
import { TaskCardProps } from "../../interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskCardDetailsModal from "./TaskCardDetailsModal";

const TaskCard: React.FunctionComponent<TaskCardProps> = (props) => {
    const { task, completed, innerRef, ...rest } = props;
    const [elevation, setElevation] = useState(0);
    const [opacity, setOpacity] = useState(completed ? 0.5 : 1);
    const [openCardModel, setOpenCardModel] = useState(false);

    const handleModelState = () => {
        setOpenCardModel((prev) => !prev);
    };

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

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Low":
                return "info";
            case "Medium":
                return "warning";
            case "High":
                return "error";
        }
    };

    return (
        <React.Fragment>
            <TaskCardDetailsModal
                task={task}
                open={openCardModel}
                onClose={handleModelState}
            />
            <Box
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                ref={innerRef}
                {...rest}
                onClick={handleModelState}
            >
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
                                <CheckCircleIcon />
                            </IconButton>
                            <Typography variant="subtitle2">
                                Completed
                            </Typography>
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
                                // display={"flex"}
                                // justifyContent="space-between"
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
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography
                                        sx={{
                                            textDecoration: completed
                                                ? "line-through"
                                                : "none",

                                            display: "block",
                                            textOverflow: "ellipsis",
                                            wordWrap: "break-word",
                                            overflow: "hidden",
                                            maxHeight: "3.6em",
                                            lineHeight: "1.8em",
                                        }}
                                        variant="body2"
                                    >
                                        {task.description}
                                    </Typography>
                                )}
                            </Box>
                            {task.priority && (
                                <Box>
                                    <Chip
                                        label={task.priority}
                                        size="small"
                                        color={getPriorityColor(task.priority)}
                                        sx={{ fontSize: "11px" }}
                                    />
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    );
};

export default TaskCard;
