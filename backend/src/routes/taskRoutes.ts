import { Router } from "express";

const router = Router();

router.route("/").get().post();
router.route("/:taskId").get().delete().patch();

export default router;
