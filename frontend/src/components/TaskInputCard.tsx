import React, { FunctionComponent, useState } from "react";
import { Paper, Box } from "@mui/material";
import { TaskInputCardProps } from "../interfaces";
import socket from "../socket";
import { useAppDispatch, useAppSelector } from "../reduxApp/hooks";
import { addTaskToKanbanBoard } from "../reduxApp/features/kanban/kanban-slice";
import { addTaskToStore } from "../reduxApp/features/tasks/tasks-slice";

const TaskInputCard: FunctionComponent<TaskInputCardProps> = ({
    hideInput,
    sectionId,
}) => {
    const [value, setValue] = useState("");
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    const token = useAppSelector((state) => state.auth.userData?.token);
    const { projectData } = useAppSelector((state) => state.currentProject);
    const dispatch = useAppDispatch();
    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        if (value) {
            // create task
            const payload = {
                token,
                task: {
                    title: value,
                    section: sectionId,
                    project: projectData?._id,
                },
            };
            socket.emit("tasks:create", payload, (request) => {
                if (request.task) {
                    dispatch(
                        addTaskToKanbanBoard({ sectionId, task: request.task })
                    );
                    dispatch(
                        addTaskToStore({
                            projectId: projectData!._id,
                            task: request.task,
                        })
                    );
                }
            });
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
                    value={value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </Box>
        </Paper>
    );
};

export default TaskInputCard;
