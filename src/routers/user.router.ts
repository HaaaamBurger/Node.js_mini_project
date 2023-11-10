import { Router } from "express";

import { authMiddleware, generalMiddleware, permissionsMiddleware, userMiddleware } from "../middlewares";
import { userController } from "../controllers";
import { UserValidator } from "../validators";
import { ESpecialAccountRoles } from "../enums";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    userController.getAllUsers,
);

router.get(
    "/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.getUserById,
);


router.put(
    "/reblock/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.reBlock
);

router.put(
    "/rechange/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateRole),
    userMiddleware.isUserExists,
    userController.reChange
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.deleteUserById,
);

router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateUser),
    userMiddleware.isUserExists,
    userController.updateUserById,
);


export const userRouter = router;