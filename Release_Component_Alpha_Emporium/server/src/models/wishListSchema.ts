import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    listOfBooks: {
      type: Array,
      required: true,
    },
  },
  { collection: "wishLists" }
);

export = mongoose.model("wishList", wishListSchema);
