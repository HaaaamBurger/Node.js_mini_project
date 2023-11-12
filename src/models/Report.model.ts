import { Schema, Types, model } from "mongoose";

import { User } from "./User.model";
import { EReportType } from "../enums";
import {EReportStatus} from "../enums/report_status_enum";

const ReportModel = new Schema({
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
        ref: User
    }
},
    {
        versionKey: false
    })

export const Report = model("report", ReportModel);