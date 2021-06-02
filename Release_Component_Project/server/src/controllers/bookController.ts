import Book from "../models/bookSchema";

export const getBooks = async (req: any, res: any) => {
  try {
    const Books = await Book.find();
    res.json(Books);
  } catch (err: any) {
    res.send("Error " + err.message);
  }
};

export const addNewBook = async (req: any, res: any) => {
  const Books = new Book(req.body);

  try {
    const a1 = await Books.save();
    res.status(200).send("Book is Added Successfully...");
  } catch (err: any) {
    res.send("Error", err.message);
  }
};

export const deleteBook = async (req: any, res: any) => {
  try {
    const Books: any | null = await Book.findById(req.params.id);
    const a1 = await Books.remove();
    res.status(200).send("Book is Deleted Successfully...");
  } catch (err: any) {
    res.send("Error", err.message);
  }
};
