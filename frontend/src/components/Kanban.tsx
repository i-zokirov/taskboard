import React from "react";
import { Box, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TaskCard from "./Card";
// import { useTheme } from "@mui/material/styles";
const columns = [
    {
        name: "Open",
        color: "#d93651",
    },
    {
        name: "In Progress",
        color: "#00aaff",
    },
    {
        name: "Pending",
        color: "#ff9f1a",
    },
    {
        name: "Completed",
        color: "#47cc8a",
    },
];

const light = "#eef1f5";
const dark = "#e7ebf0";
const Kanban: React.FC = () => {
    // const theme = useTheme();
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems={"flex-start"}
            spacing={0}
        >
            {columns.map(({ name, color }, index) => (
                <Box
                    key={name}
                    sx={{
                        width: `${100 / columns.length}vw`,
                        height: "100vh",
                        overflow: "hidden",
                        background: index % 2 === 0 ? light : dark,
                    }}
                >
                    <Box
                        sx={{
                            padding: "10px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: color,
                        }}
                    >
                        <Typography color={"white"}>{name}</Typography>
                        <Tooltip title="Selection Menu">
                            <IconButton>
                                <MoreHorizIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box sx={{ padding: "10px 5px" }}>
                        <TaskCard title="Clean kitchen" />
                        <TaskCard title="Study" />
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};

export default Kanban;
