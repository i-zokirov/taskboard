import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material";
import BoardToolbar from "../components/BoardToolbar";
import MainBoardContainer from "../components/Main";
import Drawer from "../components/Drawer";
import Kanban from "../components/Kanban";
import { useAppSelector } from "../reduxApp/hooks";

const Board: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [project, setProject] = useState("Project 1");
    const projects = ["Project 1", "Project 2"];

    const auth = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.userData || !auth.tokenVerified) navigate("/login");
    }, [auth, navigate]);

    const handleChange = (event: SelectChangeEvent) => {
        setProject(event.target.value);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <BoardToolbar
                open={open}
                projects={projects}
                project={project}
                handleChange={handleChange}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Drawer open={open} handleDrawerClose={handleDrawerClose} />
            <MainBoardContainer open={open}>
                <Kanban />
            </MainBoardContainer>
        </Box>
    );
};

export default Board;
