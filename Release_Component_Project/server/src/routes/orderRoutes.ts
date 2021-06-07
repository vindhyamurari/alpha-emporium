import express from "express";
import {
    getSingleOrder,
    myOrders,
 newOrder,
} from "../controllers/orderController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const orderRouter = express.Router();

orderRouter.post("/new", isAuthenticatedUser,newOrder);
orderRouter.get("/myOrders",isAuthenticatedUser,myOrders)
orderRouter.get("/:id",isAuthenticatedUser,getSingleOrder);
