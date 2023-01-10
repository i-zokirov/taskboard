import React from "react";
import MenuComponent from "../../custom/MenuComponent";
import {
    icons,
    productivityIcons,
    technologyIcons,
} from "../../../assets/icons";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MenuProps } from "../../../interfaces";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import { colors } from "../../../assets/theme";
const ColumnIconSelectorMenu: React.FC<MenuProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const { open, handleClose, anchorEl, handleClick, handleColorUpdate } =
        props;
    return (
        <MenuComponent
            open={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
        >
            <Box padding={"10px"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="column icon and color selector menu"
                >
                    <Tab label="Section Icon" />
                    <Tab label="Section Color" />
                </Tabs>

                {value === 0 ? (
                    <React.Fragment>
                        <Box
                            display={"flex"}
                            alignItems="center"
                            justifyContent="center"
                            padding={"10px"}
                        >
                            <Typography variant="body2">
                                Productivity & Workflow
                            </Typography>
                        </Box>

                        <Box sx={{ width: "300px" }}>
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
                        <Box sx={{ width: "300px" }}>
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
                    </React.Fragment>
                ) : (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </Box>
        </MenuComponent>
    );
};

export default ColumnIconSelectorMenu;
