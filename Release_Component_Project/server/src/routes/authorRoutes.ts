import express from "express";
import { addNewAuthor, getAuthorById, getAuthorByName } from "../controllers/authorController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const authorRouter = express.Router();

authorRouter.get("/:id", getAuthorById);
authorRouter.get("/name/:authorName",getAuthorByName)
authorRouter.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addNewAuthor
);
