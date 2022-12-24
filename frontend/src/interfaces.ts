import { SelectChangeEvent } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
export interface BoardToolbarProps extends ProjectSelectorProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

export interface ProjectSelectorProps {
    projects: string[];
    project: string;
    handleChange: (e: SelectChangeEvent) => void;
}

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export interface DrawerProps {
    open: boolean;
    handleDrawerClose: () => void;
}

export interface TaskCardProps {
    title: string;
}
