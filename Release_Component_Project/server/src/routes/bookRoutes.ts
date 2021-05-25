import express from "express";
import {
  getAllBooks,
  deleteBook,
  addNewBook,
} from "../controllers/bookController";

export const router = express.Router();

router.get("/", getAllBooks);

router.post("/", addNewBook);

router.delete("/:id", deleteBook);
