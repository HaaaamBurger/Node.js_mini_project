import { model, Schema, Types } from "mongoose";

import { EReportStatus, EReportType } from "../enums";
import { User } from "./User.model";

const ReportModel = new Schema(
  {
    type: {
      type: String,
      enum: EReportType,
      required: true,
    },
    status: {
      type: String,
      enum: EReportStatus,
      default: EReportStatus.NEW,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applicant: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
  },
);

export const Report = model("report", ReportModel);
