import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const cartRouter = express.Router();

cartRouter.delete("/book/:bookId",isAuthenticatedUser)
cartRouter.post("/:id",isAuthenticatedUser);
cartRouter.get("/:id");
cartRouter.delete("/:id",isAuthenticatedUser);

