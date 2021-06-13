import express from "express";
import {
    allOrders,
    deleteOrder,
    getAllUserOrders,
    getSingleOrder,
    myOrders,
 newOrder,
 updateOrder,
} from "../controllers/orderController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const orderRouter = express.Router();

orderRouter.post("/new", isAuthenticatedUser,newOrder);
orderRouter.get("/",isAuthenticatedUser,getAllUserOrders);
orderRouter.get("/myOrders",isAuthenticatedUser,myOrders)
orderRouter.get('/admin/orders',isAuthenticatedUser, authorizeRoles('admin'), allOrders);
orderRouter.put('/admin/order/:id',isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
orderRouter.delete('/admin/order/:id',isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
orderRouter.get("/:id",isAuthenticatedUser,getSingleOrder);
