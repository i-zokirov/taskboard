import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { ProjectSelectorProps } from "../interfaces";

const ProjectSelector: React.FC<ProjectSelectorProps> = (props) => {
    return (
        <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, color: "inherit" }}
        >
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={props.project}
                onChange={props.handleChange}
                sx={{
                    color: "inherit",
                    ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(228, 219, 233, 0.25)",
                    },
                    ".MuiSvgIcon-root ": {
                        fill: "white !important",
                    },
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.projects.map((project) => (
                    <MenuItem key={project} value={project}>
                        {project}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProjectSelector;
