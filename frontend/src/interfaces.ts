import { SelectChangeEvent } from "@mui/material";

export interface BoardToolbarProps extends ProjectSelectorProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export interface ProjectSelectorProps {
    projects: string[];
    project: string;
    handleChange: (e: SelectChangeEvent) => void;
}
