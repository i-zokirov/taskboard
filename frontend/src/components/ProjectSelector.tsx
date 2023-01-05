import React from "react";
import {
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../reduxApp/hooks";
import { setCurrentProject } from "../reduxApp/features/projects/currentProjectSlice";

const ProjectSelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.projects);
    const { projectData } = useAppSelector((state) => state.currentProject);

    const handleChange = (e: SelectChangeEvent) => {
        e.preventDefault();
        const selected = data.find((project) => project._id === e.target.value);
        dispatch(setCurrentProject(selected));
    };
    return (
        <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, color: "inherit" }}
        >
            {projectData && (
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={projectData?._id}
                    onChange={handleChange}
                >
                    {data.length &&
                        data.map((project) => (
                            <MenuItem key={project._id} value={project._id}>
                                {project.title}
                            </MenuItem>
                        ))}
                </Select>
            )}
        </FormControl>
    );
};

export default ProjectSelector;
