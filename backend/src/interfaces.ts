export interface ServerToClientEvents {}

export interface ClientToServerEvents {
    hello: () => void;
    ["projects:read"]: (payload: { userId: string }) => void;
}

export interface InterServerEvents {
    ping?: () => void;
}

export interface SocketData {}
