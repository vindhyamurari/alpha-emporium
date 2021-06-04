import express from "express";
import { addNewAuthor, getAuthorById } from "../controllers/authorController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const authorRouter = express.Router();

authorRouter.get("/:id", getAuthorById);

authorRouter.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addNewAuthor
);
