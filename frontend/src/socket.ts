import { io, Socket } from "socket.io-client";
import { socketSever } from "./config";
import { ServerToClientEvents, ClientToServerEvents } from "./interfaces";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    socketSever,
    {
        rememberUpgrade: true,
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: true,
    }
);

export default socket;
