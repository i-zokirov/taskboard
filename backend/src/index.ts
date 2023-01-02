import express from "express";
import "express-async-errors";
import userRouteHandler from "./routes/userRoutes";
import projectRouteHandler from "./routes/projectRoutes";
import taskRouteHandler from "./routes/taskRoutes";
import { errorHandler, notFoundErrorHandler } from "./middleware/errorHandlers";
import connectDB from "./config/db";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
