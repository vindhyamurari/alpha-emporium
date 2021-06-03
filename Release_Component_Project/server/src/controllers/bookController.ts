import Book from "../models/bookSchema";

export const getBooks = async (req: any, res: any) => {
  try {
    const Books = await Book.find();
    res.status(200).json(Books);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const getBookById = async (req: any, res: any) => {
  try {
    const Books = await Book.findById(req.params.id);
    res.status(200).json(Books);
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const addNewBook = async (req: any, res: any) => {
  const Books = new Book(req.body);

  try {
    const a1 = await Books.save();
    res
      .status(200)
      .json({ message: "Book is Added Successfully...", success: true });
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const deleteBook = async (req: any, res: any) => {
  try {
    const Books: any | null = await Book.findById(req.params.id);
    const a1 = await Books.remove();
    res
      .status(200)
      .json({ message: "Book is Deleted Successfully...", success: true });
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const updateBook = async (req: any, res: any) => {
  try {
    const book: any = await Book.findById(req.params.id);

    book.rating = req.body.rating;
    book.votes = req.body.votes;
    book.stock = req.body.stock;
    if (req.body.discount) {
      book.discount = req.body.discount;
      book.price = book.price - (book.discount / 100) * book.price;
    }
    const a1 = await book.save();
    res
      .status(200)
      .json({ message: "Book is Updated Successfully...", success: true });
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};
