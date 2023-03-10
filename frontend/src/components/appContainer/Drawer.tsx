import React, { useState } from "react";
import { Drawer as MUIDrawer, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DrawerHeader } from "../Main";
import { appBarMenuOptions } from "../../config";

import { drawerWidth } from "../../config";
import { DrawerProps } from "../../interfaces";
import SearchBar from "../custom/SearchBar";
import { icons } from "../../assets/icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectTypeSelectionMenu from "../project/ProjectTypeSelectionMenu";
import ProjectAddMenu from "../project/ProjectAddMenu";
import {
    useAppDispatch,
    useAppSelector,
    useOpenProjectSettings,
} from "../../reduxApp/hooks";
import { setCurrentProject } from "../../reduxApp/features/projects/currentProjectSlice";
import { IProject } from "../../types";
import ProjectDetailsModal from "../project/ProjectSettingsModal";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3268c5",
        },
        secondary: {
            main: "#f50057",
        },
        background: { default: "", paper: "#303030" },
    },
});
const Drawer: React.FC<DrawerProps> = ({ open, handleDrawerClose }) => {
    const [projectTypeMenuAnchorEl, setProjectTypeMenuAnchorEl] =
        useState<HTMLElement | null>(null);
    const [projectAddMenuAnchorEl, setProjectAddMenuAnchorEl] =
        useState<HTMLElement | null>(null);
    const [searchText, setSearchText] = useState("");

    const { projectData } = useAppSelector((state) => state.currentProject);
    const { data: projects } = useAppSelector((state) => state.projects);
    const dispatch = useAppDispatch();
    const openProjectSettings = useOpenProjectSettings();
    const openProjectTypeSelectorMenu = Boolean(projectTypeMenuAnchorEl);
    const openProjectAddMenu = Boolean(projectAddMenuAnchorEl);
    const handleSearch = () => {};
    const handleOpenProjectTypeMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setProjectTypeMenuAnchorEl(event.currentTarget);
    };
    const handleOpenProjectAddMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setProjectAddMenuAnchorEl(event.currentTarget);
    };
    const handleCloseProjectMenu = () => {
        setProjectTypeMenuAnchorEl(null);
    };
    const handleCloseProjectAddMenu = () => {
        setProjectAddMenuAnchorEl(null);
    };

    const handleProjectChange = (project: IProject) => {
        if (project._id !== projectData?._id) {
            dispatch(setCurrentProject(project));
        }
    };

    const theme = useTheme();
    return (
        <ThemeProvider theme={darkTheme}>
            <ProjectTypeSelectionMenu
                anchorEl={projectTypeMenuAnchorEl}
                open={openProjectTypeSelectorMenu}
                handleClose={handleCloseProjectMenu}
            />
            <ProjectAddMenu
                anchorEl={projectAddMenuAnchorEl}
                open={openProjectAddMenu}
                handleClose={handleCloseProjectAddMenu}
            />
            <ProjectDetailsModal />
            <MUIDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {appBarMenuOptions.map((item) => (
                        <ListItem disablePadding key={item.name}>
                            <Tooltip title="Not Implemented" placement="right">
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <RocketLaunchIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Projects"} />
                        </ListItemButton>

                        <Tooltip title="Switch to...">
                            <IconButton
                                sx={{ marginRight: "5px" }}
                                onClick={handleOpenProjectTypeMenu}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New Project">
                            <IconButton
                                sx={{ marginRight: "5px" }}
                                onClick={handleOpenProjectAddMenu}
                            >
                                {icons.add()}
                            </IconButton>
                        </Tooltip>
                    </ListItem>

                    <ListItem>
                        <SearchBar
                            label="Search a project"
                            value={searchText}
                            setValue={setSearchText}
                            handleSearch={handleSearch}
                        />
                    </ListItem>

                    {projects &&
                        projects.length &&
                        projects.map((project: IProject, index: number) => (
                            <ListItem key={project._id} disablePadding>
                                <ListItemButton
                                    onClick={() => handleProjectChange(project)}
                                >
                                    <ListItemIcon>
                                        {project.icon
                                            ? icons[project.icon]({
                                                  color:
                                                      project.color &&
                                                      project.color,
                                              })
                                            : icons["folder"]({
                                                  color:
                                                      project.color &&
                                                      project.color,
                                              })}
                                    </ListItemIcon>
                                    <ListItemText primary={project.title} />
                                </ListItemButton>
                                <Tooltip title="More...">
                                    <IconButton
                                        sx={{ marginRight: "5px" }}
                                        onClick={() => {
                                            openProjectSettings(project);
                                        }}
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                </List>
                <Divider />
            </MUIDrawer>
        </ThemeProvider>
    );
};

export default Drawer;
