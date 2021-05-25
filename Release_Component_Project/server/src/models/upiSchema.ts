import mongoose from "mongoose";

const upiSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: true,
    },
  },
  { collection: "upis" }
);

export = mongoose.model("upi", upiSchema);
