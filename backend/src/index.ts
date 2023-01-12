import express from "express";
import http from "http";
import path from "path";
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
import {
    completeSectionTasksHandler,
    createProjectHandler,
    createSectionHandler,
    createTaskHandler,
    deleteProjectHandler,
    deleteSectionHandler,
    readProjectsHandler,
    readTasksHandler,
    updateProjectHandler,
    updateSectionHandler,
    updateTaskHandler,
} from "./socket";

connectDB();
const app = express();
const dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(dirname, "/frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API server is running!");
    });
}

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
        console.log("New client joined");
        console.log(socket.id);
    });
    socket.on("projects:read", readProjectsHandler);
    socket.on("projects:create", createProjectHandler);
    socket.on("projects:update", updateProjectHandler);
    socket.on("projects:delete", deleteProjectHandler);
    socket.on("tasks:read", readTasksHandler);
    socket.on("tasks:update", updateTaskHandler);
    socket.on("tasks:create", createTaskHandler);
    socket.on("sections:create", createSectionHandler);
    socket.on("sections:update", updateSectionHandler);
    socket.on("sections:delete", deleteSectionHandler);
    socket.on("sections:completeTasks", completeSectionTasksHandler);
    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
