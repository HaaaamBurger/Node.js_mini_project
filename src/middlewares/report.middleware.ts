import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Report } from "../models";

class ReportMiddleware {
  public async isReportExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
