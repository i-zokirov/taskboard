import React, { FunctionComponent } from "react";
import { Box, Typography } from "@mui/material";
import { icons } from "../assets/icons";
const ColumnNoTasksPlaceHolder: FunctionComponent = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: " center",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                marginTop: "80%",
            }}
        >
            {icons["checkcircle"]({
                width: "50px",
                height: "50px",
                color: "#9e9e9e",
            })}
            <Typography variant="h6" fontWeight="bold" color="#9e9e9e">
                No Tasks
            </Typography>
            <Box width="70%">
                <Typography
                    variant="subtitle1"
                    color="#9e9e9e"
                    textAlign="center"
                >
                    Drag tasks here or click + to add new tasks
                </Typography>
            </Box>
        </Box>
    );
};

export default ColumnNoTasksPlaceHolder;
