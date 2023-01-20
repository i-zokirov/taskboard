import { io, Socket } from "socket.io-client";
import { localhost } from "./config";
import { ServerToClientEvents, ClientToServerEvents } from "./interfaces";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    localhost,
    {
        rememberUpgrade: true,
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: true,
    }
);

export default socket;
