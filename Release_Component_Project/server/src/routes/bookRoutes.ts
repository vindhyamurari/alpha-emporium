import express from "express";
import {
  getBooks,
  addNewBook,
  deleteBook,
  updateBook,
  getBookById,
} from "../controllers/bookController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/", isAuthenticatedUser, authorizeRoles("admin"), addNewBook);

bookRouter.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteBook
);
bookRouter.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateBook
);
