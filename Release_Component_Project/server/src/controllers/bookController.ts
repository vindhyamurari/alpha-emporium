import book from "../models/bookSchema";

export const getAllBooks = async (req: any, res: any) => {
  try {
    const books = await book.find();
    res.json(books);
  } catch (err: any) {
    res.send("Error " + err.message);
  }
};

export const addNewBook = async (req: any, res: any) => {
  const books = new book({
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating,
    price: req.body.price,
    tags: req.body.tags,
    cover: req.body.cover,
    stock: req.body.stock,
    discount: req.body.discount,
  });

  try {
    const a1 = await books.save();
    res.status(200).send("Book is Added Successfully...");
  } catch (err: any) {
    res.send("Error", err.message);
  }
};

export const deleteBook = async (req: any, res: any) => {
  try {
    const books: any | null = await book.findById(req.params.id);
    const a1 = await books.remove();
    res.status(200).send("Book is Deleted Successfully...");
  } catch (err: any) {
    res.send("Error", err.message);
  }
};
