import React, { useState } from "react";
import {
    Box,
    IconButton,
    Tooltip,
    Stack,
    Typography,
    TextField,
    Button,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Link,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TaskCardDetails } from "../interfaces";
import TransitionModal from "./TransitionModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import type {} from "@mui/x-date-pickers/themeAugmentation";
const dark = "#e7ebf0";

const TaskCardDetailsModal: React.FC<TaskCardDetails> = (props) => {
    const { open, onClose, task } = props;
    const [descriptionInput, setDescriptionInput] = useState(
        task.description ? task.description : ""
    );
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);

    const [showDescriptionInput, setShowDescriptionInput] = useState(false);

    const toggleDescriptionInput = () => {
        setShowDescriptionInput((prev) => !prev);
    };

    const saveHandler = () => {
        hideDescriptionInput();
    };
    const hideDescriptionInput = () => {
        setShowDescriptionInput(false);
    };
    const handleDateChange = (newValue: any) => {
        setDueDate(newValue);
    };

    return (
        <TransitionModal
            open={open}
            onClose={onClose}
            height={{ md: 400, lg: 600 }}
            width={{ md: 600, lg: 800 }}
        >
            <Box height={"100%"}>
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{ height: "12%", padding: "20px" }}
                >
                    <Box>
                        <button className="btn">Complete</button>
                    </Box>
                    <Box>
                        <Tooltip title="More..." placement="top">
                            <IconButton sx={{ marginLeft: "10px" }}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Close" placement="top">
                            <IconButton sx={{ marginLeft: "10px" }}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Divider />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    sx={{ height: "88%" }}
                >
                    <Box
                        display={"flex"}
                        flexDirection="column"
                        justifyContent={"space-between"}
                        sx={{
                            width: "70%",
                            minHeight: "100%",
                            padding: "25px",
                        }}
                    >
                        <Box>
                            <Typography variant="h5">{task.title}</Typography>
                            <Box marginTop={2}>
                                {showDescriptionInput ? (
                                    <React.Fragment>
                                        <TextField
                                            id={`${task.id} task description`}
                                            label="Description"
                                            multiline
                                            maxRows={4}
                                            defaultValue={task.description}
                                            size="small"
                                            variant="standard"
                                            fullWidth
                                            value={descriptionInput}
                                            onChange={(e) =>
                                                setDescriptionInput(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Button
                                            onClick={saveHandler}
                                            variant="outlined"
                                            color={"secondary"}
                                            size="small"
                                            sx={{ marginTop: 1 }}
                                        >
                                            Save
                                        </Button>
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

                        <Box sx={{ minHeight: "300px" }}>
                            <Typography variant="h6">Conversations</Typography>
                            <Box>
                                <TextField
                                    id={`conversation`}
                                    multiline
                                    maxRows={6}
                                    placeholder={"Click here to add a comment"}
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                />

                                <Box
                                    marginTop={1}
                                    display="flex"
                                    justifyContent={"space-between"}
                                >
                                    <Tooltip title={"Insert emoji"}>
                                        <IconButton>
                                            <AddReactionIcon
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                    opacity: "0.7",
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={"Add comment"}>
                                        <IconButton>
                                            <ArrowCircleRightIcon
                                                sx={{
                                                    width: "30px",
                                                    height: "30px",
                                                    opacity: "0.7",
                                                }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            background: dark,
                            borderBottomRightRadius: "10px",
                            width: "30%",
                            minHeight: "100%",
                            paddingTop: "20px",
                        }}
                    >
                        <Box padding={"20px"}>
                            <DateTimePicker
                                label="Set Due date"
                                value={dueDate}
                                onChange={handleDateChange}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        size="large"
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
                        <Box padding={"10px"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText>Watching</ListItemText>
                            </ListItemButton>
                            <Box paddingLeft={"20px"}>
                                <AccountCircleIcon sx={{ opacity: 0.6 }} />
                            </Box>
                        </Box>
                        <Divider />
                        <Box padding={"10px"}>
                            <Link href="/" sx={{ textDecoration: "none" }}>
                                <Typography variant="body2">
                                    Project 1
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </TransitionModal>
    );
};

export default TaskCardDetailsModal;
