import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "your name can't exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
      length: [13, "Please enter 10 digit mobile number"],
      validate: [validator.isMobilePhone, "Please enter a valid mobile number"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be longer than 6 characters"],
      // select: false,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      // required: true,
    },
    cart:{
      type:Array
    }
  },
  { collection: "users", timestamps: true }
);

export = mongoose.model("user", userSchema);
