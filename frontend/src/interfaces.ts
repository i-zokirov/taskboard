import { SelectChangeEvent } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { ITask } from "./types";

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
    task: ITask;
    badge?: string;
    completed?: boolean;
    innerRef: any;
    [x: string]: any;
}

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    [x: string]: any;
}

export interface TaskCardDetails extends ModalProps {
    task: ITask;
}
