import joi from "joi";

import { EReportType } from "../enums";

export class ReportValidator {
  static type = joi.valid(...Object.values(EReportType));
  static title = joi.string().min(1).max(50);
  static description = joi.string().min(0).max(560);

  static create_report = joi.object({
    type: this.type.required(),
    title: this.title.required(),
    description: this.description.required(),
  });
  static update_report = joi.object({
    type: this.type,
    title: this.title,
    description: this.description,
  });
}
