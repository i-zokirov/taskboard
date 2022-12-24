import React, { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { TaskCardProps } from "../interfaces";
import Draggable from "react-draggable";

const TaskCard: React.FunctionComponent<TaskCardProps> = ({ title }) => {
    const [elevation, setElevation] = useState(0);
    const handleMouseOver = (e: any) => {
        e.preventDefault();
        setElevation(3);
    };

    const handleMouseLeave = (e: any) => {
        e.preventDefault();
        setElevation(0);
    };
    return (
        <Draggable>
            <Box onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <Paper
                    elevation={elevation}
                    sx={{ padding: "10px", marginBottom: "10px" }}
                >
                    <Typography>{title}</Typography>
                </Paper>
            </Box>
        </Draggable>
    );
};

export default TaskCard;
