import express from "express";
import { addToCart, deleteFromCart } from "../controllers/cartController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const cartRouter = express.Router();

cartRouter.delete("/:productId",isAuthenticatedUser,deleteFromCart)
cartRouter.put("/:productId",isAuthenticatedUser,addToCart);
cartRouter.get("/:id");
//cartRouter.delete("/:id",isAuthenticatedUser);

