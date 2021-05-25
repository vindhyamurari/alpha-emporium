import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  { collection: "reviews" }
);

export = mongoose.model("review", reviewsSchema);
