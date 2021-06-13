import express from "express";
import {
  getBooks,
  addNewBook,
  deleteBook,
  updateBook,
  getBookById,
  createbookReview,
  getBookReviews,
  getBooksByText,
  getBookByAuthor,
  getBookByTitle,
  getBookByRating,
  getBookByPrice,
  getBookByTags
} from "../controllers/bookController";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth";

export const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.put("/review",isAuthenticatedUser,createbookReview)
bookRouter.get("/review/:bookId",isAuthenticatedUser,getBookReviews)
bookRouter.get("/:id", getBookById);
bookRouter.post("/", isAuthenticatedUser, authorizeRoles("admin"), addNewBook);
//bookRouter.get("/text/:text",getBooksByText);
// bookRouter.get()
bookRouter.get("/by/:author",getBookByAuthor);
bookRouter.get("/text/:text",getBooksByText);
bookRouter.get("/title/:title",getBookByTitle);
bookRouter.get("/rating/:rating",getBookByRating);
bookRouter.get("/price/min/:min/max/:max",getBookByPrice);
bookRouter.get("/tag/:tag",getBookByTags);
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


