import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  link: { type: String, required: true },
  author: { type: String, required: true },
  review: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
