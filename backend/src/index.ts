import express from "express";
import "express-async-errors";
import userRouteHandler from "./routes/userRoutes";
import { errorHandler, notFoundErrorHandler } from "./middleware/errorHandlers";
import connectDB from "./config/db";

connectDB();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTE HANDLERS
app.use("/api/users", userRouteHandler);

// ERROR HANDLERS
app.use(notFoundErrorHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
