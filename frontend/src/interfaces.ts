import { SelectChangeEvent } from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
    IProject,
    ISection,
    ISectionOptions,
    ITask,
    ITaskOptions,
} from "./types";

export interface BoardToolbarProps {
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

export interface ColumnProps {
    columnId?: string;
    index?: number;
    [x: string]: any;
}

export interface ColumnHeaderProps {
    columnId: string;
    column: any;
}

export interface MenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose?: () => void;
    [x: string]: any;
}

export interface AddTaskModalProps extends ModalProps {}

export interface SearchBarProps {
    label: string;
    value: string;
    setValue: (prop: string) => void;
    handleSearch: () => void;
}

export interface TaskInputCardProps {
    hideInput: () => void;
    sectionId: string;
}

// SOCKET

export interface ServerToClientEvents {}

interface ProjectsReadProps {
    projects: IProject[];
    error?: string;
}

export interface ClientToServerEvents {
    hello: () => void;
    ["projects:read"]: (
        payload: { token: string | undefined },
        callback: (response: ProjectsReadProps) => void
    ) => void;
    ["projects:create"]: (
        payload: {
            token: string | undefined;
            project: { title: string; description: string };
        },
        callback: (response: { project?: IProject; error?: string }) => void
    ) => void;
    ["projects:update"]: (
        payload: {
            token?: string;
            projectId?: string;
            updates: { title?: string; description?: string; icon?: string };
        },
        callback: (response: { project?: IProject; error?: string }) => void
    ) => void;

    ["tasks:read"]: (
        payload: { token: string | undefined; projectId: string },
        callback: (response: {
            tasks?: ITask[];
            error?: string | undefined;
        }) => void
    ) => void;
    ["tasks:update"]: (
        payload: {
            token: string | undefined;
            taskId: string;
            updates: { [x: string]: any };
        },
        callback: (response: {
            task?: ITask;
            error?: string | undefined;
        }) => void
    ) => void;
    ["tasks:create"]: (
        payload: {
            token: string | undefined;
            task: ITaskOptions;
        },
        callback: (response: {
            task?: ITask;
            error?: string | undefined;
        }) => void
    ) => void;
    ["sections:create"]: (
        payload: {
            token: string | undefined;
            section: ISectionOptions;
        },
        callback: (response: {
            section?: ISection;
            error?: string | undefined;
        }) => void
    ) => void;
    ["sections:update"]: (
        payload: {
            token: string | undefined;
            updates: ISectionOptions;
            sectionId: string;
        },
        callback: (response: {
            section?: ISection;
            error?: string | undefined;
        }) => void
    ) => void;
    ["sections:delete"]: (
        payload: {
            token: string | undefined;
            sectionId: string;
        },
        callback: (response: {
            project?: IProject;
            error?: string | undefined;
        }) => void
    ) => void;
    ["sections:completeTasks"]: (
        payload: {
            token: string | undefined;
            sectionId: string;
        },
        callback: (response: {
            success?: boolean;
            error?: string | undefined;
            updated?: number;
        }) => void
    ) => void;
}
