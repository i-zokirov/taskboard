import { Typography, Box, TextField, SelectChangeEvent } from "@mui/material";

import React, {
    ChangeEvent,
    FunctionComponent,
    useState,
    FormEvent,
} from "react";
import { AddTaskModalProps } from "../interfaces";
import ProjectSelector from "./ProjectSelector";
import TransitionModal from "./TransitionModal";

const AddTaskModal: FunctionComponent<AddTaskModalProps> = (props) => {
    const [newTask, setNewTask] = useState("");
    const [project, setProject] = useState("Project 1");
    const projects = ["Project 1", "Project 2"];

    const { open, onClose } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewTask(e.currentTarget.value);
    };

    const handleChangeProject = (event: SelectChangeEvent) => {
        setProject(event.target.value);
    };

    const handleCreateTask = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(event);
        // save new task

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
