import { Router } from "express";

import { authMiddleware, generalMiddleware, rolesMiddleware, userMiddleware } from "../middlewares";
import { userController } from "../controllers";
import { UserValidator } from "../validators";
import { ESpecialAccountRoles } from "../enums";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    userController.getAllUsers,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.getUserById,
);


router.put(
    "/reblock/:id",
    rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.reBlock
);

// router.put(
//     "/rechange/:id",
//     rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
//     generalMiddleware.isIdValid("id"),
//     userMiddleware.isUserExists,
//     userController.reChange
// );

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.deleteUserById,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    rolesMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateUser),
    userMiddleware.isUserExists,
    userController.updateUserById,
);


export const userRouter = router;