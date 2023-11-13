import { EEmailAction } from "../enums";

export const templates = {
  [EEmailAction.UNCENSORED_AD]: {
    templateName: "uncensored-ad",
    subject: "Dear manager, some user tries to post uncensored advertisement",
  },
};
