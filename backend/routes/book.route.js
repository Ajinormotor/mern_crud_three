import express from "express";
import {fetchSingBook, 
  addBooks,
  fetchBooks,
  searchBooks,
  deleteBook,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/add-book", addBooks);

router.get("/fetch-book", fetchBooks);

router.get("/fetch-book/:id", fetchSingBook);


router.put("/update-book/:id", updateBook);

router.delete("/delete-book/:id", deleteBook);

router.get("/search", searchBooks);

export default router;
