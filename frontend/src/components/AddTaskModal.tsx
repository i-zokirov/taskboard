import { Typography, Box, TextField } from "@mui/material";
import React, { ChangeEvent, useState, FormEvent } from "react";
import { AddTaskModalProps } from "../interfaces";
import ProjectSelector from "./ProjectSelector";
import TransitionModal from "./TransitionModal";
import { useAppSelector, useAppDispatch } from "../reduxApp/hooks";
import socket from "../socket";
import { ITaskOptions } from "../types";
import { addTaskToKanbanBoard } from "../reduxApp/features/kanban/kanban-slice";
import { addTaskToStore } from "../reduxApp/features/tasks/tasks-slice";
const AddTaskModal: React.FunctionComponent<AddTaskModalProps> = (props) => {
    const [newTask, setNewTask] = useState("");

    const { open, onClose } = props;
    const token = useAppSelector((state) => state.auth.userData?.token);
    const projectData = useAppSelector(
        (state) => state.currentProject.projectData
    );
    const dispatch = useAppDispatch();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewTask(e.currentTarget.value);
    };

    const handleCreateTask = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // save new task
        if (newTask) {
            const payload: {
                token: string | undefined;
                task: ITaskOptions;
            } = {
                token,
                task: {
                    title: newTask,
                    project: projectData?._id,
                },
            };
            if (projectData?.sections?.length) {
                payload.task["section"] = projectData.sections[0]._id;
            }
            socket.emit("tasks:create", payload, (response) => {
                if (response.task) {
                    dispatch(
                        addTaskToKanbanBoard({
                            task: response.task,
                            sectionId: response.task.section._id,
                        })
                    );
                    dispatch(
                        addTaskToStore({
                            task: response.task,
                            projectId: projectData!._id,
                        })
                    );
                }
            });
        }

        // close modal
        onClose();
    };
    return (
        <TransitionModal open={open} onClose={onClose} width={400} height={250}>
            <Box padding={"30px 20px"}>
                <Typography variant="h5" fontWeight={"550"} color={"#3268c5"}>
                    Add task
                </Typography>
                <br />
                <TextField
                    label="Task Title"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={newTask}
                    onChange={handleChange}
                />
                <br />
                <Box display={"flex"} marginTop={"10px"}>
                    <ProjectSelector />
                </Box>
                <Box display={"flex"} justifyContent="flex-end">
                    <button
                        type="submit"
                        className="btn"
                        onClick={handleCreateTask}
                        onSubmit={handleCreateTask}
                    >
                        Create task
                    </button>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default AddTaskModal;
