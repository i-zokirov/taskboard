import { IProject } from "./models/Project.model";
import { ISection, ISectionOptions } from "./models/Section.model";
import { ITask, ITaskOptions } from "./models/Task.model";

export interface ServerToClientEvents {
    ["projects:update"]: (project: IProject) => void;
    ["tasks:update"]: (payload: { task: ITask; coordinates: any }) => void;
    ["tasks:create"]: (payload: { task: ITask }) => void;
    ["tasks:delete"]: (payload: { task: ITask }) => void;
    ["sections:update"]: (section: ISection) => void;
    ["sections:create"]: (section: ISection) => void;
    ["sections:delete"]: (project: IProject) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    ["projects:read"]: (payload: { token: string }) => void;
    ["projects:create"]: (payload: {
        token: string;
        project: IProject;
    }) => void;
    ["projects:update"]: (payload: {
        token: string;
        projectId: string;
        updates: { title: string; description: string; icon: string };
    }) => void;
    ["projects:delete"]: (payload: {
        token: string;
        projectId: string;
    }) => void;
    ["projects:addMember"]: (payload: {
        token: string;
        projectId: string;
        email: string;
    }) => void;
    ["tasks:read"]: (
        payload: { token: string | undefined; projectId: string },
        callback: (response: {
            tasks?: ITask[];
            error?: string | undefined;
        }) => void
    ) => void;
    ["tasks:update"]: (
        payload: {
            token: string;
            taskId: string;
            updates: { [x: string]: any };
        },
        callback: (response: {
            task?: ITask;
            error?: string | undefined;
        }) => void
    ) => void;
    ["tasks:delete"]: (
        payload: {
            token: string;
            taskId: string;
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
            token: string;
            sectionId: string;
        },
        callback: (response: {
            success?: boolean;
            error?: string | undefined;
            updated?: number;
        }) => void
    ) => void;
}

export interface InterServerEvents {
    ping?: () => void;
}

export interface SocketData {}
