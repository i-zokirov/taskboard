import React from "react";
import TransitionModal from "../custom/TransitionModal";
import {
    Typography,
    Box,
    Tabs,
    Tab,
    createTheme,
    ThemeProvider,
    Tooltip,
    IconButton,
} from "@mui/material";
import { useAppSelector, useCloseProjectSettings } from "../../reduxApp/hooks";
import { themeOptions } from "../../assets/theme";
import InfoSection from "./projectSettingSections/InfoSection";
import MembersSection from "./projectSettingSections/MembersSection";
import PowerUpSection from "./projectSettingSections/PowerUpSection";
import Automations from "./projectSettingSections/Automations";
import Checklists from "./projectSettingSections/Checklists";
import Tags from "./projectSettingSections/Tags";
import { icons } from "../../assets/icons";
import ProjectSettingsMenu from "./ProjectSettingsMenu";

const theme = createTheme(themeOptions);

const getSection = (tab: number) => {
    const sections = [
        <InfoSection />,
        <MembersSection />,
        <PowerUpSection />,
        <Automations />,
        <Checklists />,
        <Tags />,
    ];
    return sections[tab];
};

const ProjectSettingsModal: React.FunctionComponent = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [settingsAnchorEl, setSettingsAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const openSettingsMenu = Boolean(settingsAnchorEl);
    const handleTabValueChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setTabValue(newValue);
    };

    const projectSettings = useAppSelector((state) => state.projectSettings);
    const closeProjectSettings = useCloseProjectSettings();

    const handleCloseSettingsMenu = () => {
        console.log(`Closing settings menu`);
        setSettingsAnchorEl(null);
    };
    const handleOpenSettingsMenu = (e: React.MouseEvent<HTMLElement>) => {
        setSettingsAnchorEl(e.currentTarget);
    };
    return (
        <ThemeProvider theme={theme}>
            <TransitionModal
                open={projectSettings.open}
                onClose={closeProjectSettings}
                width={600}
                height={450}
            >
                <ProjectSettingsMenu
                    open={openSettingsMenu}
                    anchorEl={settingsAnchorEl}
                    handleClose={handleCloseSettingsMenu}
                />
                <Box>
                    <Box
                        padding={"20px 30px"}
                        display="flex"
                        justifyContent={"space-between"}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={"550"}
                            color={"#3268c5"}
                        >
                            Project settings
                        </Typography>
                        <Box>
                            <Tooltip title="Get notified about all project activity (not implemented)">
                                <IconButton sx={{ marginLeft: "6px" }}>
                                    {icons.notificationsactive()}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More...">
                                <IconButton
                                    sx={{ marginLeft: "6px" }}
                                    onClick={handleOpenSettingsMenu}
                                >
                                    {icons.morehorizon()}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Close">
                                <IconButton
                                    sx={{ marginLeft: "6px" }}
                                    onClick={closeProjectSettings}
                                >
                                    {icons.close()}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabValueChange}
                        aria-label="projects settings tab"
                        variant="scrollable"
                        scrollButtons="auto"
                        selectionFollowsFocus
                    >
                        <Tab label="Info" />
                        <Tab label="Members" />
                        <Tab label="Power-Ups" />
                        <Tab label="Automations" />
                        <Tab label="Checklists" />
                        <Tab label="Tags" />
                    </Tabs>
                    {getSection(tabValue)}
                </Box>
            </TransitionModal>
        </ThemeProvider>
    );
};

export default ProjectSettingsModal;
