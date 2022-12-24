import React from "react";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../config";
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const MainBoardContainer: React.FC<{
    open?: boolean;
    children: JSX.Element;
}> = ({ open, children }) => {
    return (
        <Main open={open}>
            {/* <DrawerHeader /> */}
            <div style={{ marginTop: "60px" }}></div>
            {children}
        </Main>
    );
};

export default MainBoardContainer;
