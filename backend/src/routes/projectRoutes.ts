import { Router } from "express";
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject,
} from "../controllers/projectController";
import authenticate from "../middleware/authenticate";

const router = Router();

router
    .route("/")
    .get(authenticate, getProjects)
    .post(authenticate, createProject);
router
    .route("/:projectId")
    .get(authenticate, getProjectById)
    .delete(authenticate, deleteProject)
    .patch(authenticate, updateProject);

export default router;
