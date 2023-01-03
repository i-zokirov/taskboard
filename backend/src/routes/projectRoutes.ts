import { Router } from "express";
import {
    createProjectHandler,
    defaultSetupController,
    deleteProject,
    getProjectById,
    getProjectsHandler,
    updateProjectHandler,
} from "../controllers/projectController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.route("/default").post(authenticate, defaultSetupController);

router
    .route("/")
    .get(authenticate, getProjectsHandler)
    .post(authenticate, createProjectHandler);
router
    .route("/:projectId")
    .get(authenticate, getProjectById)
    .delete(authenticate, deleteProject)
    .patch(authenticate, updateProjectHandler);

export default router;
