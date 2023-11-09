import { Router } from "express";
import { authMiddleware, generalMiddleware, userMiddleware } from "../middlewares";
import { userController } from "../controllers";
import { UserValidator } from "../validators";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userController.getAllUsers,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.getUserById,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.deleteUserById,
);

router.put("" +
    "/:id",
    authMiddleware.checkAccessToken,
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateUser),
    userMiddleware.isUserExists,
    userController.updateUserById,
);


export const userRouter = router;