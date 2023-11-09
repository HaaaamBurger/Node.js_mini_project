import { Router } from "express";
import { UserValidator } from "../validators";
import { authController } from "../controllers";
import {authMiddleware, generalMiddleware, userMiddleware } from "../middlewares";


const router = Router();

router.post("/register",
    generalMiddleware.isBodyValid(UserValidator.registerIn),
    userMiddleware.isEmailUniq,
    authController.registerIn
);

router.post("/login",
    generalMiddleware.isBodyValid(UserValidator.logIn),
    authController.logIn
);

router.post("/refresh",
    authMiddleware.checkRefreshToken,
    authController.refreshIn
);

export const authRouter = router;