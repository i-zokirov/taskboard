import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BoardToolbar from "../components/appContainer/BoardToolbar";
import MainBoardContainer from "../components/Main";
import Drawer from "../components/appContainer/Drawer";
import Kanban from "../components/kanban/Kanban";
import { useAppSelector, useFetchProjects } from "../reduxApp/hooks";
import LinearProgress from "@mui/material/LinearProgress";
import { Status } from "../types";

const Board: React.FC = () => {
    const [open, setOpen] = React.useState(true);
    const { tokenVerified, userData } = useAppSelector((state) => state.auth);
    const { status, loading } = useAppSelector((state) => state.projects);
    const navigate = useNavigate();

    const fetchProjects = useFetchProjects();
    useEffect(() => {
        if (!userData || !tokenVerified) {
            navigate("/login");
            return;
        } else {
            fetchProjects();
        }
    }, [tokenVerified, userData]);

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
