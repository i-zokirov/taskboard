import React from "react";
import MenuComponent from "./MenuComponent";
import { icons, productivityIcons, technologyIcons } from "../assets/icons";
import { Box, IconButton, Typography } from "@mui/material";
import { MenuProps } from "../interfaces";
const ColumnIconSelectorMenu: React.FC<MenuProps> = (props) => {
    const { open, handleClose, anchorEl } = props;
    return (
        <MenuComponent
            open={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
        >
            <Box padding={"10px"}>
                <Typography variant={"subtitle1"} fontWeight={"bold"}>
                    Section Icons
                </Typography>

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

                <Box width="200px">
                    {productivityIcons.map((icon, index) => (
                        <IconButton key={index} sx={{ margin: "3px" }}>
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
                <Box width="200px">
                    {technologyIcons.map((icon, index) => (
                        <IconButton key={index} sx={{ margin: "3px" }}>
                            {icons[icon]({
                                width: "28px",
                                height: "28px",
                            })}
                        </IconButton>
                    ))}
                </Box>
            </Box>
        </MenuComponent>
    );
};

export default ColumnIconSelectorMenu;
