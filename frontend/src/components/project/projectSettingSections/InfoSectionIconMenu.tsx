import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { productivityIcons, technologyIcons } from "../../../assets/icons";
import { icons } from "../../../assets/icons";
import MenuComponent from "../../custom/MenuComponent";
import { MenuProps } from "../../../interfaces";
import { useUpdateProject } from "../../../reduxApp/hooks";

const InfoSectionIconMenu: React.FC<MenuProps> = (props) => {
    const updateProject = useUpdateProject();
    const handleClick = (icon: string) => {
        updateProject({ updates: { icon } });
        if (props.handleClose) props.handleClose();
    };
    return (
        <MenuComponent {...props}>
            <Box textAlign={"center"} padding={"10px"}>
                <Typography variant="body2">Productivity & Workflow</Typography>
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
        </MenuComponent>
    );
};

export default InfoSectionIconMenu;
