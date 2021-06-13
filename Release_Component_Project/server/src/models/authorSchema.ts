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
    image:{
      type:String
    }
  },
  { collection: "authors" }
);

export = mongoose.model("author", authorSchema);
