import User from "../models/userSchema";
import Book from "../models/bookSchema";
import { bookRouter } from "../routes/bookRoutes";
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
      res.status(200).send({
        success: true,
        message: "Added to cart successfully",
        updatedCart,
      });
    else
        return res.status(200).send({success:false,message:'Already Added'})
  } catch (err) {
    res.status(404).send({ success: false, messages: err.message });
  }
};

export const deleteFromCart = async (req: any, res: any, next: any) => {
  try {
    let productId = req.params.productId;
    let userId = req.user.id;
    let updatedCart = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: productId } },
      { new: true }
    );
    if (updatedCart)
      res.status(200).send({
        success: true,
        message: "Removed from cart successfully",
        updatedCart,
      });
    else
        return res.status(200).send({success:false,message:'Already Added'})
  } catch (err) {
    res.status(404).send({ success: false, messages: err.message });
  }
};

export const getUserOrder = async (req: any, res: any, next: any) => {
  try {
    const userId = req.body.id;
    console.log("userID",userId);
    let user: any = await User.findOne({ _id: userId });
    let products = user.cart;
    console.log("cart products", products);
    let cartItems = await Book.find({ _id: { $in: products } });
    console.log(cartItems);
    
    res.status(200).send(cartItems);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const clearUserCart = async (req: any, res: any, next: any) => {
  try {
    const userId = req.body.id;
    console.log("userID",userId);
    let clearCart=await User.updateOne({_id:userId}, { $set : {cart: [] }} , {multi:true} );
    //let user: any = await User.findOne({ _id: userId });
    //let products = user.cart;
    console.log("clearcart products", clearCart);
    //let cartItems = await Book.find({ _id: { $in: products } });
    console.log(clearCart);
    
    res.status(200).send({success:true,message:"Cart is emptied."});
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};
