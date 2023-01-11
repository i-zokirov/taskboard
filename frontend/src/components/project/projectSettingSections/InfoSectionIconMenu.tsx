import React from "react";
import { Box, IconButton, Typography, Tabs, Tab, Tooltip } from "@mui/material";
import { productivityIcons, technologyIcons } from "../../../assets/icons";
import { icons } from "../../../assets/icons";
import MenuComponent from "../../custom/MenuComponent";
import { MenuProps } from "../../../interfaces";
import { useUpdateProject } from "../../../reduxApp/hooks";
import { colors } from "../../../assets/theme";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
const InfoSectionIconMenu: React.FC<MenuProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const updateProject = useUpdateProject();
    const handleClick = (icon: string) => {
        updateProject({ updates: { icon } });
        if (props.handleClose) props.handleClose();
    };
    const handleColorUpdate = (color: string) => {
        updateProject({ updates: { color } });
        if (props.handleClose) props.handleClose();
    };
    return (
        <MenuComponent {...props}>
            <Tabs
                centered
                value={value}
                onChange={handleChange}
                aria-label="project icon and color selector menu"
            >
                <Tab label="Project Icon" />
                <Tab label="Project Color" />
            </Tabs>

            {value === 0 ? (
                <Box>
                    <Box textAlign={"center"} padding={"10px"}>
                        <Typography variant="body2">
                            Productivity & Workflow
                        </Typography>
                    </Box>
                    <Box sx={{ width: "350px" }}>
                        {productivityIcons.map((icon, index) => (
                            <IconButton
                                key={index}
                                sx={{ margin: "3px" }}
                                onClick={() => {
                                    handleClick(icon);
                                }}
                            >
                                {icons[icon]({
                                    width: "28px",
                                    height: "28px",
                                })}
                            </IconButton>
                        ))}
                    </Box>

                    <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent="center"
                        padding={"10px"}
                    >
                        <Typography variant="body2">Technology</Typography>
                    </Box>
                    <Box sx={{ width: "350px" }}>
                        {technologyIcons.map((icon, index) => (
                            <IconButton
                                key={index}
                                sx={{ margin: "3px" }}
                                onClick={() => {
                                    handleClick(icon);
                                }}
                            >
                                {icons[icon]({
                                    width: "28px",
                                    height: "28px",
                                })}
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box
                        display={"flex"}
                        alignItems="center"
                        justifyContent="center"
                        padding={"10px"}
                    >
                        <Typography variant="body2">
                            Pre-configured colors
                        </Typography>
                    </Box>
                    <Box sx={{ width: "300px" }}>
                        {colors.map((color, index) => (
                            <Tooltip title={color.colorName} key={index}>
                                <IconButton
                                    sx={{ margin: "3px" }}
                                    onClick={() =>
                                        handleColorUpdate(color.colorCode)
                                    }
                                >
                                    <RadioButtonCheckedIcon
                                        sx={{
                                            color: color.colorCode,
                                            fontSize: "28px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            )}
        </MenuComponent>
    );
};

export default InfoSectionIconMenu;
