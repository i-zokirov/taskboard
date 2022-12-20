import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.route("/").post().get(authenticate);
router.route("/login").post(loginUser);
router.route("/sign-up").post(registerUser);
router.route("/:userId").patch().get().delete();

export default router;
