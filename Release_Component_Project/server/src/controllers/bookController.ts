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

    book.ratings = req.body.ratings||book.ratings;
    book.votes = req.body.votes||book.votes;
    book.stock = req.body.stock||book.stock;
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
console.log("name",req.user.name)
console.log("id",req.user.id)

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
export const getBookByAuthor=  async (req: any, res: any) => {
  try {
    const author = new RegExp(req.params.author, "i");
    const books = await Book.find({ author });
    //    res.json(books)
    res.send(JSON.stringify(books));
  } catch (err) {
    res.send("Error " + err);
  }
};

// export const getBookByText= async (req: any, res: any) => {
//   try {
//     const text = new RegExp(req.params.text, "i");
//     const books = await Book.find({author:text});
//     //    res.json(books)
//     res.send(books);
//   } catch (err) {
//     res.send("Error " + err);
//   }
// };

export const getBooksByText=async(req:any,res:any,next:any)=>{  
  let books=await Book.find( { $text: { $search: req.params.text.toString() } } )
  res.send(books);
  };



export const getBookByTitle= async (req: any, res: any) => {
  try {
    const title = new RegExp(req.params.title, "i");
    const books = await Book.find({ title });
    //    res.json(books)
    res.send(books);
  } catch (err) {
    res.send("Error " + err);
  }
};

export const getBookByRating=async (req: any, res: any) => {
  try {
    let books = await Book.find({ ratings: { $gte: req.params.rating } });
    // console.log(JSON.stringify(books))
    res.send(books);
  } catch (err) {
    res.send("Error " + err);
  }
};

export const getBookByPrice=async (req: any, res: any) => {
  try {
    console.log(req.params.min);
    let books = await Book.find({
      $and: [
        { price: { $gte: req.params.min } },

        { price: { $lte: req.params.max } },
      ],
    });
    // console.log(JSON.stringify(books))
    res.send(books);
  } catch (err) {
    res.send("Error " + err);
  }
};

export const getBookByTags=async(req: any, res: any) => {
  try {
    const tag = new RegExp(req.params.tag, "i");
    const books = await Book.find({tags:tag});
    //    res.json(books)
    res.send(books);
  } catch (err) {
    res.send("Error " + err);
  }
}