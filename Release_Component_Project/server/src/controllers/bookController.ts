import Book from "../models/bookSchema";
import User from "../models/userSchema"
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

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
    book.authorImage=req.body.authorImage;
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

export const createbookReview = catchAsyncErrors(async (req:any, res:any, next:any) => {

  const { rating, comment, bookId } = req.body;
  let reviewedUser:any= await User.findById(req.user.id)
  const review = {
      user: req.user.id,
      name: reviewedUser.name,
      rating: Number(rating),
      comment
  }

 const book:any = await Book.findById(bookId);

  const isReviewed = book.reviews.find(
      (r:any) => r.user.toString() === req.user.id.toString()
  )

  if (isReviewed) {
    console.log("boo.reviews",book.reviews);
    
      book.reviews.forEach((review:any) => {
          if (review.user.toString() === req.user.id.toString()) {
              review.comment = comment;
              review.rating = rating;
          }
      })

  } else {
    console.log("boo.reviews",book.reviews);

      book.reviews.push(review);
      book.numOfReviews = book.reviews.length
  }

  book.ratings = book.reviews.reduce((acc:any, item:any) => item.rating + acc, 0) / book.reviews.length;

  await book.save();
//{ validateBeforeSave: false }
  res.status(200).json({
      success: true
  })

})

export const getBookReviews = catchAsyncErrors(async (req:any, res:any, next:any) => {
  console.log("querry",req.query);
  
  const book:any = await Book.findById(req.params.bookId);

  res.status(200).json({
      success: true,
      reviews:book.reviews
  })
})