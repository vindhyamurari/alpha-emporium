
import User from "../models/userSchema";
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

export const addToCart = async (req: any, res: any, next: any) => {
  try {
    let productId = req.params.productId;
    let userId = req.user.id;
    let updatedCart = await User.findOneAndUpdate(
      { _id: userId, cart: { $ne: productId } },
      { $push: { cart: productId } },
      { new: true }
    );
    if (updatedCart)
      res
        .status(200)
        .send({
          success: true,
          message: "Added to cart successfully",
          updatedCart,
        });
    // else
    //     return res.status(200).send({success:false,message:'Already Added'})
  } catch (err) {
    res.status(200).send({ success: false, messages: err.message });
  }
};

export const deleteFromCart = async (req: any, res: any, next: any) => {
try{
    let productId = req.params.productId;
    let userId = req.user.id;
    let updatedCart = await User.findOneAndUpdate(
        { _id: userId},
        { $pull: { cart: productId } },
        { new: true }
      );
      if (updatedCart)
        res
          .status(200)
          .send({
            success: true,
            message: "Removed from cart successfully",
            updatedCart,
          });
      // else
      //     return res.status(200).send({success:false,message:'Already Added'})
    } catch (err) {
      res.status(200).send({ success: false, messages: err.message });
    }
};


