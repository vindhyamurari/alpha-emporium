import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
    },
    CVV: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  { collection: "cards" }
);

export = mongoose.model("card", cardSchema);
