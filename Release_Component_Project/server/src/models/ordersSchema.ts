import mongoose from "mongoose";
 
const ordersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    orderItems: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        }
    ],
    paymentInfo: {
     type:String
    },
    paidAt: {
      type: Date,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "orders" }
);
 
export = mongoose.model("order", ordersSchema);