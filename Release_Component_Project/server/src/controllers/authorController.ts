import Author from "../models/authorSchema";
import Book from "../models/bookSchema";

export const getAuthorById = async (req: any, res: any) => {
  try {
    const Authors = await Author.findById(req.params.id);
    res.status(200).json(Authors);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const addNewAuthor = async (req: any, res: any) => {
  const Authors = new Author(req.body);
  //console.log("bokkkk", Array.isArray(req.body.listOfBooks));

  try {
    const aut = await Book.findOne({ author: req.body.name });
    let book: any;
    let list = req.body.listOfBooks;
    for (let i = 0; i < list.length; i++) {
      book = await Book.find({ title: list[i] });
      if (book !== []) {
        break;
      }
    }
    console.log("books", book);
    if (!aut || book === []) {
      res.status(404).json({
        message: "Book not found. Please add the book first...",
        success: false,
      });
    } else {
      await Authors.save();
      res
        .status(200)
        .json({ message: "Author is Added Successfully...", success: true });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};
