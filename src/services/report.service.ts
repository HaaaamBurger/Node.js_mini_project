import { Report } from "../models"
import { IReport } from "../interfaces";
import { ApiError } from "../errors";

class ReportService {
    public async sendReport(report: IReport, _userId: string): Promise<void> {
        try {
            await Report.create({...report, applicant: _userId});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async updateReport(repId: string, report: IReport): Promise<IReport> {
        try {
            return await Report.findByIdAndUpdate(repId, report, { returnDocument: "after" });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async deleteReport(repId: string): Promise<void> {
        try {
            await Report.findByIdAndDelete(repId);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getAllReports(): Promise<IReport[]> {
        try {
            return await Report.find();
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const reportService = new ReportService();