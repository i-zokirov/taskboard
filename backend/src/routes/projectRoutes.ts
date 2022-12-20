import { Router } from "express";

const router = Router();

router.route("/").get().post();
router.route("/:projectId").get().delete().patch();

export default router;
