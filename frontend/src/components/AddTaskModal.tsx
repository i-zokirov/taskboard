import { Typography, Box } from "@mui/material";
import React, { FormEvent, useRef } from "react";
import { AddTaskModalProps } from "../interfaces";
import ProjectSelector from "./project/ProjectSelector";
import TransitionModal from "./TransitionModal";
import { useAppSelector, useCreateTask } from "../reduxApp/hooks";
import { ITaskOptions } from "../types";

const AddTaskModal: React.FunctionComponent<AddTaskModalProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { open, onClose } = props;
    const token = useAppSelector((state) => state.auth.userData?.token);
    const createTask = useCreateTask();
    const handleCreateTask = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // save new task
        if (inputRef.current?.value) {
            const payload: {
                token: string | undefined;
                task: ITaskOptions;
            } = {
                token,
                task: {
                    title: inputRef.current.value,
                },
            };
            createTask(payload);
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

                <input
                    type="text"
                    style={{
                        width: "100%",
                        fontSize: "14px",
                        border: "1px solid blue",
                    }}
                    placeholder="Start typing..."
                    autoFocus
                    ref={inputRef}
                    id={"New task input"}
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
