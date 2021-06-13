import express from "express";
import { addToCart, clearUserCart, deleteFromCart, getUserOrder } from "../controllers/cartController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const cartRouter = express.Router();
cartRouter.put("/clear",isAuthenticatedUser,clearUserCart);
cartRouter.delete("/:productId",isAuthenticatedUser,deleteFromCart)
cartRouter.put("/:productId",isAuthenticatedUser,addToCart);
cartRouter.post("/",getUserOrder);
