import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./interfaces";

const localhost = "http://localhost:5000";
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
