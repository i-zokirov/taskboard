import React, { FunctionComponent, useState } from "react";
import { MenuProps } from "../interfaces";
import MenuComponent from "./MenuComponent";
import {
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
    TextField,
} from "@mui/material";
import { icons } from "../assets/icons";
const ColumnMenu: FunctionComponent<MenuProps> = (props) => {
    const { open, handleClose, anchorEl } = props;
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState("");
    const handleAddDescriptionClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setShowDescriptionInput(true);
    };
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionValue(e.currentTarget.value);
    };

    const inputBlurHandler = () => {
        if (descriptionValue) {
            // save section description
        } else {
            setShowDescriptionInput(false);
        }
    };

    return (
        <MenuComponent
            open={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
        >
            <Box
                padding="10px"
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Typography variant="subtitle1" fontWeight={"bold"}>
                    Section
                </Typography>
                <IconButton onClick={handleClose}>
                    {icons["close"]()}
                </IconButton>
            </Box>
            <Divider sx={{ marginBottom: "5px", marginTop: "5px" }} />

            <ListItemButton>
                <ListItemIcon>{icons.archive()}</ListItemIcon>
                <ListItemText>Archive completed tasks</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>{icons.checkcircle()}</ListItemIcon>
                <ListItemText>Complete all tasks</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>{icons.print()}</ListItemIcon>
                <ListItemText>Print section ...</ListItemText>
            </ListItemButton>

            <Divider sx={{ marginBottom: "5px", marginTop: "5px" }} />

            {showDescriptionInput ? (
                <Box padding="10px">
                    <TextField
                        id="outlined-multiline-sectiondescription-input"
                        label="Description"
                        multiline
                        rows={3}
                        value={descriptionValue}
                        fullWidth
                        autoFocus
                        size="small"
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                    />
                    <Box width="250px" textAlign="center">
                        <Typography
                            variant="caption"
                            textAlign="center"
                            color="#9e9e9e"
                        >
                            You can use this description to communicate with
                            your project member which tasks should move here and
                            why.
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <ListItemButton
                    component="button"
                    onClick={handleAddDescriptionClick}
                    sx={{ width: "100%" }}
                >
                    <ListItemIcon>{icons.subject()}</ListItemIcon>
                    <ListItemText>Add description</ListItemText>
                </ListItemButton>
            )}

            <Divider sx={{ marginBottom: "5px", marginTop: "5px" }} />
            <Button fullWidth color="secondary">
                Delete
            </Button>
        </MenuComponent>
    );
};

export default ColumnMenu;
