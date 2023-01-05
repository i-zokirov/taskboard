import { ITask } from "./models/Task.model";

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
}

export interface InterServerEvents {
    ping?: () => void;
}

export interface SocketData {}
