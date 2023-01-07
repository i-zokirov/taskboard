import React, { FunctionComponent, useRef } from "react";
import { Paper, Box } from "@mui/material";
import { TaskInputCardProps } from "../interfaces";

import { useAppSelector, useCreateTask } from "../reduxApp/hooks";

const TaskInputCard: FunctionComponent<TaskInputCardProps> = ({
    hideInput,
    sectionId,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const token = useAppSelector((state) => state.auth.userData?.token);
    const { projectData } = useAppSelector((state) => state.currentProject);
    const createTask = useCreateTask();
    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        if (inputRef.current && inputRef.current.value) {
            // create task
            const payload = {
                token,
                task: {
                    title: inputRef.current.value,
                    section: sectionId,
                    project: projectData?._id,
                },
            };
            createTask(payload);
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
                    style={{ width: "100%", fontSize: "14px" }}
                    placeholder="Task title"
                    autoFocus
                    ref={inputRef}
                    onBlur={handleBlur}
                    id={"New task input"}
                />
            </Box>
        </Paper>
    );
};

export default TaskInputCard;
