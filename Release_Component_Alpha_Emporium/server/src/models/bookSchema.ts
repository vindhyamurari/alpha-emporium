import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: false,
    },
    reviews : {
      type :Array,
      required:false,
    }
  },
  { collection: "books" }
);

export = mongoose.model("book", bookSchema);
