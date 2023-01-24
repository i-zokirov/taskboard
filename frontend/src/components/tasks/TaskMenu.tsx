import React from "react";
import { MenuProps } from "../../interfaces";
import MenuComponent from "../custom/MenuComponent";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    Tooltip,
    Button,
} from "@mui/material";
import { icons } from "../../assets/icons";
import { useDeleteTask } from "../../reduxApp/hooks";

const taskmenuoptions = [
    {
        title: "Duplicate",
        icon: "duplicate",
    },
    {
        title: "Repeat",
        icon: "refresh",
    },
    {
        title: "Complete",
        icon: "checkcircle",
    },
    {
        title: "Archive",
        icon: "archive",
    },
    {
        title: "Copy link",
        icon: "link",
    },
    {
        title: "Print ...",
        icon: "print",
    },
    {
        title: "Convert to Project",
        icon: "rocketicon",
    },
];
const TaskMenu: React.FC<MenuProps> = (props) => {
    const deleteTask = useDeleteTask();
    const handleDeleteTask = () => {
        if (props.handleClose) props.handleClose();
        if (props.task) deleteTask({ taskId: props.task._id, token: "" });
    };
    return (
        <MenuComponent {...props}>
            {taskmenuoptions.map((option, index) => (
                <Box key={index}>
                    <Tooltip title={"Not implemented"} placement="left">
                        <ListItemButton>
                            <ListItemIcon>{icons[option.icon]()}</ListItemIcon>
                            <ListItemText>{option.title}</ListItemText>
                        </ListItemButton>
                    </Tooltip>
                    {index % 2 !== 0 && <Divider />}
                </Box>
            ))}
            <Box textAlign={"center"} paddingBottom="10px" paddingTop="10px">
                <Box>
                    <Button fullWidth color="error" onClick={handleDeleteTask}>
                        Delete task
                    </Button>
                </Box>
            </Box>
        </MenuComponent>
    );
};

export default TaskMenu;
