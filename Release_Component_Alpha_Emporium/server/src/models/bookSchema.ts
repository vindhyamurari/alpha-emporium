import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Book title"],
      // trim: true,
      maxLength: [100, "Book title cannot exceed 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please enter Book Author"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Book price"],
      maxLength: [5, "Book price cannot exceed 5 characters"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please enter Book description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please select category for this Book"],
      enum: {
        values: [
          "Devotional",
          "Mythological",
          "Romantic",
          "Horror",
          "Epic",
          "Indian",
          "Historic",
          "Fantasy",
          "Fiction",
          "Love",
          "Classic",
          "Adventure",
          "Suspence",
          "Thriller",
          "Young-Adult",
        ],
        message: "Please select correct category for Book",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter Book stock"],
      maxLength: [5, "Book title cannot exceed 5 characters"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          // required: true,
        },
        title: {
          type: String,
          // required: true,
        },
        rating: {
          type: Number,
          // required: true,
        },
        comment: {
          type: String,
          // required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "books", timestamps: true }
);

export = mongoose.model("Book", bookSchema);
