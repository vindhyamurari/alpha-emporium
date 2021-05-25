import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    listOfBooks: {
      type: Array,
      required: true,
    },
    interests: {
      type: Array,
      required: true,
    },
    works: {
      type: String,
      required: true,
    },
  },
  { collection: "authors" }
);

export = mongoose.model("author", authorSchema);
