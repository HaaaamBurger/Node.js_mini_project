import { Router } from "express";

import { AdvertisementValidator } from "../validators";
import { advertisementMiddleware, authMiddleware, fileMiddleware, generalMiddleware, permissionsMiddleware, userMiddleware } from "../middlewares";
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
    "/statistics/by-id/:statId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    generalMiddleware.isIdValid("statId"),
    advertisementMiddleware.isAccountTypeAllowed([EAccountTypes.PREMIUM]),
    advertisementMiddleware.isStatisticExists,
    advertisementController.statsById,
)

router.get(
    "/all",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    advertisementController.getAllAdvertisements,
);

router.get(
    "/byId/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.getAdvertisementById,
);

router.get(
    "/user-ads/:id",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    generalMiddleware.isIdValid("id"),
    userMiddleware.isUserExists,
    advertisementController.getUserAdvertisements
)

router.post(
    "/create",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isBodyValid(AdvertisementValidator.createAdvertisement),
    advertisementMiddleware.isLimitReached(),
    advertisementController.createAdvertisement,
);

router.post(
    "/:adId/photo",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    advertisementMiddleware.isAllowToManageAdvertisement("adId", [ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isIdValid("adId"),
    fileMiddleware.isCarPhotoValid,
    advertisementController.uploadCarPhoto,
);

router.delete(
    "/delete-byId/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    advertisementMiddleware.isAllowToManageAdvertisement("adId", [ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.deleteAdvertisementById,
);

router.put(
    "/update-byId/:adId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER, ESpecialAccountRoles.SELLER]),
    generalMiddleware.isBodyValid(AdvertisementValidator.updateAdvertisement),
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    advertisementController.updateAdvertisementById,
);

export const advertisementRouter = router;
