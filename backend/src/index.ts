import express from "express";
import http from "http";
import "express-async-errors";
import { Server, Socket } from "socket.io";
import userRouteHandler from "./routes/userRoutes";
import projectRouteHandler from "./routes/projectRoutes";
import taskRouteHandler from "./routes/taskRoutes";
import { errorHandler, notFoundErrorHandler } from "./middleware/errorHandlers";
import connectDB from "./config/db";
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "./interfaces";
import { readProjectsHandler, readTasksHandler } from "./socket";

connectDB();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
// ROUTE HANDLERS
app.use("/api/users", userRouteHandler);
app.use("/api/projects", projectRouteHandler);
app.use("/api/projects", taskRouteHandler);

// ERROR HANDLERS
app.use(notFoundErrorHandler);
app.use(errorHandler);

// HTTP SERVER
const server = http.createServer(app);

// WebSocket

// SOCKET SERVER
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server);

// SOCKET CONNECTION
io.on("connection", function (socket: Socket) {
    socket.on("hello", () => {
        // ...
        console.log("New client joined");
        console.log(socket.id);
    });

    socket.on("projects:read", readProjectsHandler);
    socket.on("tasks:read", readTasksHandler);

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
