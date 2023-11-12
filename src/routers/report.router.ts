import { Router } from "express";
import { authMiddleware, generalMiddleware, permissionsMiddleware, reportMiddleware, userMiddleware } from "../middlewares";
import { ReportValidator } from "../validators";
import { reportController } from "../controllers";
import { ESpecialAccountRoles } from "../enums";

const router = Router();

router.get("/all",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    reportController.getAllReports
);

router.get(
    "/by-repId/:repId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("repId"),
    reportMiddleware.isReportExists,
    reportController.getReportById,
)

router.put(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    generalMiddleware.isBodyValid(ReportValidator.create_report),
    reportController.sendReport,
);

router.put(
    "/update/:repId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("repId"),
    generalMiddleware.isBodyValid(ReportValidator.update_report),
    reportMiddleware.isReportExists,
    reportController.updateReport,
);

router.delete(
    "/delete/:repId",
    authMiddleware.checkAccessToken,
    userMiddleware.isUserBlocked,
    permissionsMiddleware.isRoleAllowed([ESpecialAccountRoles.ADMIN, ESpecialAccountRoles.MANAGER]),
    generalMiddleware.isIdValid("repId"),
    reportMiddleware.isReportExists,
    reportController.deleteReport,
);

export const reportRouter = router;