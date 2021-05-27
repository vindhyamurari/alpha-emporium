import express from "express";
import {
  getBooks,
  addNewBook,
  deleteBook,
} from "../controllers/bookController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.post("/", addNewBook);

bookRouter.delete("/:id", deleteBook);
