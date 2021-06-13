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
  try {
    const aut = await Book.findOne({ author: req.body.name });
    let book: any;
    let list = req.body.listOfBooks;
    for (let i = 0; i < list.length; i++) {
      book = await Book.find({ title: list[i] });
      if (book.length !== 0) {
        break;
      }
    }
    if (!aut || book.length === 0) {
      res.status(404).json({
        message: "Book not found. Please add the book first...",
        success: false,
      });
    } else {
      await Authors.save().then((author: any) => {
        console.log(author._id);
      });

      res
        .status(200)
        .json({ message: "Author is Added Successfully...", success: true });
    }
  } catch (err: any) {
    res.status(404).json({ err: err.message, success: false });
  }
};

export const getAuthorByName=async(req:any,res:any)=>{
  try{
    let name=req.params.authorName;
    const Authors=await Author.findOne({name});
    res.status(200).json(Authors);
  }catch(err:any){
    res.status(404).json({err:err.message,success:false})
  }
}
