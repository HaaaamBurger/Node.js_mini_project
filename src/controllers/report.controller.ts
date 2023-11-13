import { NextFunction, Request, Response } from "express";

import { IReport } from "../interfaces";
import { reportService } from "../services";

class ReportController {
  public async sendReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const report = req.body;
      const { _userId } = req.res.locals.tokenPayload;

      await reportService.sendReport(report, _userId);

      res.status(200).json("Report sended");
    } catch (e) {
      next(e);
    }
  }

  public async updateReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReport>> {
    try {
      const { repId } = req.params;
      const body = req.body;

      const updatedReport = await reportService.updateReport(repId, body);
      return res.status(200).json(updatedReport);
    } catch (e) {
      next(e);
    }
  }
  public async deleteReport(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { repId } = req.params;

      await reportService.deleteReport(repId);

      res.status(200).json("Report deleted");
    } catch (e) {
      next(e);
    }
  }

  public async getAllReports(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IReport[]>> {
    try {
      const reports = await reportService.getAllReports();

      return res.json(reports);
    } catch (e) {
      next(e);
    }
  }

  public getReportById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<IReport> {
    try {
      const report = req.res.locals.report;

      return res.json(report);
    } catch (e) {
      next(e);
    }
  }
}

export const reportController = new ReportController();
