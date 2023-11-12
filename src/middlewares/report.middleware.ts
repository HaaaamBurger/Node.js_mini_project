import { Request, Response, NextFunction } from "express";

import { Report } from "../models";
import { ApiError } from "../errors";

class ReportMiddleware {
    public async isReportExists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { repId } = req.params;
            const report = await Report.findById(repId);

            if (!report) {
                throw new ApiError("No such a report", 401);
            }

            req.res.locals.report = report;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const reportMiddleware = new ReportMiddleware();