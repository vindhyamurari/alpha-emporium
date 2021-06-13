import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookList from './BookList';
import Paginate from './Paginate';
import * as Constants from '../../Reducers/constants';
import BookServices from "../../Services/book-services";
import { ToastContainer } from 'react-toastify';
import CartServices from '../../Services/cart-services'
import Toast from '../../utils/helper'

interface Props {
    
}

export default function BooksPaginate({}: Props): ReactElement {
    const [currentPage, setcurrentPage] = useState(1);
    const [booksPerPage, setbooksPerPage] = useState(8);
    const page = useSelector((state:any) => state.page);
    const bookServices=new BookServices();
    const cartServices=new CartServices();
    const toast=new Toast();
    const dispatch = useDispatch()
    const user = useSelector((state:any)=> state.user)
    const book = useSelector((state :any)=> state.book)

    useEffect(() => {
        bookServices.getAllBooks()
            .then((res:any)=>{
                dispatch({type:Constants.SET_ALL_BOOKS,payload:res.data})
            })
            .catch((err)=>{
                console.log(err.message)
            })
            if(user.token!==""){
                cartServices.getAllItemsOfCart(user.loggedInUser.id)
                .then((res:any)=>{
                    dispatch({type:Constants.SET_CART_ITEMS,payload:res.data})
                })
                .catch((err:any)=>{
                    console.log('get cart of book pagintion',err.message)
                })
            }
    }, [])

    useEffect(() => {
        bookServices.searchBooks(book.searchBy,book.searchInput)
            .then((res:any)=>{
                dispatch({type:Constants.SET_SEARCHED_BOOKS,payload:res.data})
            })
            .catch((err)=>{
               console.log('in search books ',err.message)
            })
    }, [book.searchInput])

    let indexOfLastBook=currentPage*booksPerPage;
    let indexOfFirstBook=indexOfLastBook-booksPerPage;
    let currentBooksSet=book.books.slice(indexOfFirstBook,indexOfLastBook);

    useEffect(() => {
      setcurrentPage(page.pageNumber);
    }, [page])

    return (
        <>
        {book.searchInput===""?<>
        <BookList currentBooks={currentBooksSet}></BookList>
        <Paginate  booksPerPage={booksPerPage} totalBooks={book.books.length}></Paginate>
        </>:<BookList currentBooks={book.searchedBooks}></BookList>
        }    
        </>
    )
}
