import { ITask, ITaskOptions } from "./models/Task.model";

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
    hello: () => void;
    ["projects:read"]: (payload: { token: string }) => void;
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
}

export interface InterServerEvents {
    ping?: () => void;
}

export interface SocketData {}
