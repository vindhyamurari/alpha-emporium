import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    listOfBooks: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { collection: "orders" }
);

export = mongoose.model("order", ordersSchema);
