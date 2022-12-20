import { Router } from "express";
import { updateProject } from "../controllers/projectController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.route("/").get().post();
router.route("/:taskId").get().delete().patch(authenticate, updateProject);

export default router;
