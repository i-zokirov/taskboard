import { Router } from "express";
import { loginUser, registerUser, test } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.route("/").post().get(authenticate, test);
router.route("/login").post(loginUser);
router.route("/sign-up").post(registerUser);
router.route("/:userId").post().get();

export default router;
