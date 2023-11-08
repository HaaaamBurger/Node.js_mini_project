import { Router } from "express";
import { UserValidator } from "../validators";
import { authController } from "../controllers";
import { generalMiddleware, userMiddleware } from "../middlewares";


const router = Router();

router.post("/register",
    generalMiddleware.isBodyValid(UserValidator.register),
    userMiddleware.isEmailUniq,
    authController.register
);

export const authRouter = router;