import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import BoardToolbar from "../components/BoardToolbar";
import MainBoardContainer from "../components/Main";
import Drawer from "../components/Drawer";
import Kanban from "../components/Kanban";
import { useAppSelector, useAppDispatch } from "../reduxApp/hooks";
import socket from "../socket";
import LinearProgress from "@mui/material/LinearProgress";
import {
    projectsRequest,
    projectsRequestSuccess,
} from "../reduxApp/features/projects/projects-slice";
import { Status } from "../types";
import { setCurrentProject } from "../reduxApp/features/projects/currentProjectSlice";

const Board: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const auth = useAppSelector((state) => state.auth);
    const { status, loading } = useAppSelector((state) => state.projects);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        return () => {
            if (!auth.userData || !auth.tokenVerified) {
                navigate("/login");
            } else {
                const payload = { token: auth.userData.token };
                dispatch(projectsRequest());
                socket.emit("projects:read", payload, (response) => {
                    dispatch(projectsRequestSuccess(response.projects));
                    if (response.projects.length) {
                        dispatch(setCurrentProject(response.projects[0]));
                    }
                });
            }
        };
    }, [auth, navigate]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <BoardToolbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Drawer open={open} handleDrawerClose={handleDrawerClose} />
            <MainBoardContainer open={open}>
                {status === Status.Pending && loading ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <Kanban />
                )}
            </MainBoardContainer>
        </Box>
    );
};

export default Board;
