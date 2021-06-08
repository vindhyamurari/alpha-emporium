import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BookList from './BookList';
import Paginate from './Paginate';

interface Props {
    
}

export default function BooksPaginate({}: Props): ReactElement {
    const [books, setbooks] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [booksPerPage, setbooksPerPage] = useState(8);
    const page = useSelector((state:any) => state.page);

    useEffect(() => {
        // fetach books from db
        let arr:any=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30];
        setbooks(arr);
    }, [])

    let indexOfLastBook=currentPage*booksPerPage;
    let indexOfFirstBook=indexOfLastBook-booksPerPage;
    let currentBooksSet=books.slice(indexOfFirstBook,indexOfLastBook);

    useEffect(() => {
        console.log(`page from useEffect`, page)
      setcurrentPage(page.pageNumber);
    }, [page])

    return (
        <>
            <BookList currentBooks={currentBooksSet}></BookList>
            <Paginate  booksPerPage={booksPerPage} totalBooks={books.length}></Paginate>
        </>
    )
}
