import { Router } from "express";

import { authMiddleware, generalMiddleware, permissionsMiddleware, userMiddleware } from "../middlewares";
import { userController } from "../controllers";
import { UserValidator } from "../validators";
import { ESpecialAccountRoles } from "../enums";

const router = Router();

router.get(
    "/all",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    userController.getAllUsers,
);

router.get(
    "/byId/:id",
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
    "/change-role/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateRole),
    userMiddleware.isUserExists,
    userController.changeRole
);

router.delete(
    "/delete-user/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    userController.deleteUserById,
);

router.put(
    "/update-byId/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN]),
    generalMiddleware.isIdValid("id"),
    generalMiddleware.isBodyValid(UserValidator.updateUser),
    userMiddleware.isUserExists,
    userController.updateUserById,
);

// router.put("/")


export const userRouter = router;