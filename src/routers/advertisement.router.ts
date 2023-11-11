import { Router } from "express";

import { AdvertisementValidator } from "../validators";
import { advertisementMiddleware, authMiddleware, generalMiddleware, permissionsMiddleware, userMiddleware } from "../middlewares";
import { advertisementController } from "../controllers";
import { EAccountTypes, ESpecialAccountRoles } from "../enums";

const router = Router();

router.get(
    "/statistics",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    advertisementMiddleware.isAccountTypeAllowed([EAccountTypes.PREMIUM]),
    advertisementController.advertisementStats,
)

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.BUYER, ESpecialAccountRoles.SELLER]),
    advertisementController.getAllAdvertisements,
);

router.get(
    "/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.BUYER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.getAdvertisementById,
);

router.get(
    "/userADs/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.BUYER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    advertisementController.getUserAdvertisements
)

router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isBodyValid(AdvertisementValidator.createAdvertisement),
    advertisementMiddleware.isLimitReached(),
    advertisementController.createAdvertisement,
);

router.delete(
    "/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isIdValid("adId"),
    generalMiddleware.isAllowToManage("adId", [ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.deleteAdvertisementById,
);

router.put(
    "/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isBodyValid(AdvertisementValidator.updateAdvertisement),
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.updateAdvertisementById,
);

export const advertisementRouter = router;
