import React, { FunctionComponent, useState } from "react";
import { Paper, Box } from "@mui/material";
import { TaskInputCardProps } from "../interfaces";

const TaskInputCard: FunctionComponent<TaskInputCardProps> = ({
    hideInput,
}) => {
    const [value, setValue] = useState("");
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        if (value) {
            // create task
        }
        hideInput();
    };
    return (
        <Paper
            elevation={1}
            sx={{
                marginBottom: "10px",
                borderRadius: "10px",
                height: "55px",
                border: "0.5px solid #3268c5",
            }}
        >
            <Box
                sx={{ padding: "10px" }}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
            >
                <input
                    type="text"
                    style={{ width: "100%", fontSize: "16px" }}
                    placeholder="Task title"
                    autoFocus
                    value={value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </Box>
        </Paper>
    );
};

export default TaskInputCard;
