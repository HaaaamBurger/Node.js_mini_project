import { model, Schema } from "mongoose";

import { ECurrency } from "../enums";

const CurrencyModel = new Schema(
  {
    base_ccy: {
      type: String,
      default: ECurrency.UAH,
      required: true,
    },
    usd_ccy: {
      type: String,
      required: true,
    },
    eur_ccy: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  },
);

export const Currency = model("currency", CurrencyModel);
