import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: true,
    },
    books: {
      type: Array,
    },
   
  },
  { collection: "cart-items" }
);

export = mongoose.model("cart", cartSchema);
