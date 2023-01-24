import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Tooltip,
    Typography,
    TextField,
    Button,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TaskCardDetails } from "../../interfaces";
import TransitionModal from "../custom/TransitionModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Divider from "@mui/material/Divider";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAppSelector, useUpdateTaskDetails } from "../../reduxApp/hooks";
import { ITaskOptions } from "../../types";
import TaskMenu from "./TaskMenu";
const dark = "#e7ebf0";

const priorities = ["Low", "Medium", "High"];

const TaskCardDetailsModal: React.FC<TaskCardDetails> = (props) => {
    const { open, onClose, task } = props;
    const [descriptionInput, setDescriptionInput] = useState(
        task.description ? task.description : ""
    );
    const [titleInput, setTitleInput] = useState(task.title ? task.title : "");
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [assignedTo, setAssignedTo] = useState<string | undefined>(
        task.assignedTo ? task.assignedTo._id : ""
    );

    const [taskMenuAnchorEl, setTaskMenuAnchorEl] =
        useState<HTMLElement | null>(null);
    const openTaskMenu = Boolean(taskMenuAnchorEl);
    const handleOpenTaskMenu = (e: React.MouseEvent<HTMLElement>) => {
        setTaskMenuAnchorEl(e.currentTarget);
    };
    const handleCloseTaskMenu = () => {
        console.log(`Closing task menu`);
        setTaskMenuAnchorEl(null);
    };
    const toggleDescriptionInput = () => {
        setShowDescriptionInput((prev) => !prev);
    };

    const toggleTitleInput = () => {
        setShowTitleInput((prev) => !prev);
    };

    const updateTaskDetails = useUpdateTaskDetails();
    const token = useAppSelector((state) => state.auth.userData?.token);

    const saveHandler = () => {
        setShowTitleInput(false);
        hideDescriptionInput();
        const taskObject: ITaskOptions = {};
        if (descriptionInput !== task.description) {
            taskObject.description = descriptionInput;
        }
        if (dueDate !== task.dueDate && dueDate) {
            taskObject.dueDate = dueDate;
        }
        if (titleInput !== task.title) {
            taskObject.title = titleInput;
        }
        const payload = { token, taskId: task._id, updates: taskObject };
        updateTaskDetails(payload);
    };

    const handlePriorityChange = (e: SelectChangeEvent) => {
        const payload = {
            token,
            taskId: task._id,
            updates: { priority: e.target.value },
        };
        updateTaskDetails(payload);
    };

    const markTaskCompleted = () => {
        const payload = {
            token,
            taskId: task._id,
            updates: { completed: true },
        };
        updateTaskDetails(payload);
    };
    const hideDescriptionInput = () => {
        setShowDescriptionInput(false);
    };
    const handleDateChange = (newValue: any) => {
        setDueDate(newValue);
        if (newValue) {
            const payload = {
                token,
                taskId: task._id,
                updates: { dueDate: newValue },
            };
            updateTaskDetails(payload);
        }
    };

    const projectData = useAppSelector(
        (state) => state.currentProject.projectData
    );
    const updateTask = useUpdateTaskDetails();
    const handleAssigneeChange = (e: SelectChangeEvent) => {
        if (assignedTo !== e.target.value) {
            setAssignedTo(e.target.value);
            updateTask({
                taskId: task._id,
                token: "",
                updates: { assignedTo: e.target.value },
            });
        }
    };

    useEffect(() => {
        if (task.assignedTo && task.assignedTo._id !== assignedTo) {
            setAssignedTo(task.assignedTo?._id);
        }
    }, [task]);

    return (
        <TransitionModal
            open={open}
            onClose={onClose}
            height={{ md: 400, lg: 400 }}
            width={{ md: 600, lg: 700 }}
        >
            <TaskMenu
                anchorEl={taskMenuAnchorEl}
                open={openTaskMenu}
                handleClose={handleCloseTaskMenu}
                task={task}
            />
            <Box>
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{ padding: "20px" }}
                >
                    <Box
                        display={"flex"}
                        justifyContent="flex-start"
                        alignItems={"center"}
                        width="80%"
                    >
                        {task.completed ? (
                            <Button variant="outlined" disabled={true}>
                                Completed
                            </Button>
                        ) : (
                            <button
                                className="btn"
                                onClick={markTaskCompleted}
                                disabled={task.completed}
                            >
                                Complete
                            </button>
                        )}

                        {task.completed ? (
                            <Box
                                display={"flex"}
                                width="50%"
                                justifyContent={"space-around"}
                                alignItems={"center"}
                            >
                                <Box>
                                    <CheckCircleIcon
                                        sx={{
                                            color: "#47cc8a",
                                            fontSize: "26px",
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body1">
                                        Completed by {task.completedBy?.name}
                                    </Typography>
                                    <Typography variant={"caption"}>
                                        {task.completedOn &&
                                            new Date(
                                                task.completedOn
                                            )?.toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Box>
                                <FormControl
                                    sx={{ m: 1, minWidth: 140 }}
                                    size="small"
                                >
                                    <InputLabel id="task-assignee-select-small">
                                        Assigned to
                                    </InputLabel>
                                    <Select
                                        labelId="task-assignee-select-small"
                                        id="task-assignee-select-small"
                                        value={assignedTo}
                                        label="Assigned To"
                                        onChange={handleAssigneeChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {projectData?.members?.map(
                                            (member, indx) => (
                                                <MenuItem
                                                    value={member._id}
                                                    key={indx}
                                                >
                                                    {member.name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                        )}
                    </Box>
                    <Box>
                        <Tooltip title="More..." placement="top">
                            <IconButton
                                sx={{ marginLeft: "10px" }}
                                onClick={handleOpenTaskMenu}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Close" placement="top">
                            <IconButton
                                sx={{ marginLeft: "10px" }}
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Divider />

                <Box
                    height="80%"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"space-between"}
                        sx={{
                            width: "70%",
                            padding: "25px",
                        }}
                    >
                        <Box>
                            {showTitleInput ? (
                                <TextField
                                    id={`${task.id} task title`}
                                    label="Title"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    value={titleInput}
                                    onChange={(e) =>
                                        setTitleInput(e.target.value)
                                    }
                                    autoFocus
                                    InputProps={{
                                        style: { fontSize: 16 },
                                    }}
                                    onBlur={saveHandler}
                                />
                            ) : (
                                <Typography
                                    variant="h6"
                                    onClick={toggleTitleInput}
                                >
                                    {task.title}
                                </Typography>
                            )}

                            <Box marginTop={2}>
                                {showDescriptionInput ? (
                                    <React.Fragment>
                                        <TextField
                                            id={`${task.id} task description`}
                                            label="Description"
                                            multiline
                                            maxRows={4}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={descriptionInput}
                                            onChange={(e) =>
                                                setDescriptionInput(
                                                    e.target.value
                                                )
                                            }
                                            autoFocus
                                            InputProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            onBlur={saveHandler}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        onClick={toggleDescriptionInput}
                                    >
                                        {task.description
                                            ? task.description
                                            : "Click here to add a description"}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            background: dark,
                            width: "30%",
                            height: 318,
                            borderBottomRightRadius: "10px",
                        }}
                    >
                        <Box padding={"20px"}>
                            <DateTimePicker
                                label="Set due date"
                                value={dueDate}
                                onChange={handleDateChange}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        size="small"
                                    />
                                )}
                            />
                        </Box>
                        <Divider />
                        <Box padding={"10px"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText>Tags</ListItemText>
                            </ListItemButton>
                        </Box>

                        <Divider />
                        <br />
                        <FormControl
                            variant="standard"
                            sx={{ padding: "10px", color: "inherit" }}
                            fullWidth
                        >
                            <Select
                                labelId="task-priority-selector-label"
                                id="task-priority-selector"
                                value={task.priority}
                                onChange={handlePriorityChange}
                                fullWidth
                            >
                                {priorities.map((priority) => (
                                    <MenuItem key={priority} value={priority}>
                                        {priority}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box padding={"10px"} sx={{ textAlign: "center" }}>
                            <Typography variant="subtitle1">
                                {task.project.title}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </TransitionModal>
    );
};

export default TaskCardDetailsModal;
