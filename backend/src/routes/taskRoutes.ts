import { Router } from "express";
import {
    createTask,
    deleteTask,
    getSingleTask,
    getTasks,
    updateTask,
} from "../controllers/taskController";
import authenticate from "../middleware/authenticate";

const router = Router();

router
    .route("/:projectId/tasks")
    .get(authenticate, getTasks)
    .post(authenticate, createTask);
router
    .route("/:projectId/tasks/:taskId")
    .get(authenticate, getSingleTask)
    .delete(authenticate, deleteTask)
    .patch(authenticate, updateTask);

export default router;
