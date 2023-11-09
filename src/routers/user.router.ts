import { Router } from "express";
import {advertisementMiddleware, authMiddleware, generalMiddleware } from "../middlewares";
import { userController } from "../controllers";
import { AdvertisementValidator } from "../validators";

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userController.getAllUsers
);
router.post(
    "/advertisement",
    authMiddleware.checkAccessToken,
    generalMiddleware.isBodyValid(AdvertisementValidator.createAdvertisement),
    userController.createAdvertisement
);
router.get(
    "/advertisement/:adId",
    authMiddleware.checkAccessToken,
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    userController.getAdvertisementById
);

router.delete(
    "/advertisement/:adId",
    authMiddleware.checkAccessToken,
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    userController.deleteAdvertisementById
);
router.put("" +
    "/advertisement/:adId",
    authMiddleware.checkAccessToken,
    generalMiddleware.isBodyValid(AdvertisementValidator.updateAdvertisement),
    generalMiddleware.isIdValid("adId"),
    advertisementMiddleware.isAdvertisementExists,
    userController.updateAdvertisementById,
);

export const userRouter = router;