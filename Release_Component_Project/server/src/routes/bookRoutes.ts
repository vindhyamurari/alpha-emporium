import express from "express";
import {
  getBooks,
  addNewBook,
  deleteBook,
  updateBook,
  getBookById,
  createbookReview,
  getBookReviews,
  getBooksByText
} from "../controllers/bookController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.put("/review",isAuthenticatedUser,createbookReview)
bookRouter.get("/review/:bookId",isAuthenticatedUser,getBookReviews)
bookRouter.get("/:id", getBookById);
bookRouter.post("/", isAuthenticatedUser, authorizeRoles("admin"), addNewBook);
bookRouter.get("/text/:text",getBooksByText);
// bookRouter.get()
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


