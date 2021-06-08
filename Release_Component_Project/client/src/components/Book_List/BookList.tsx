import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import '../../styles/bookList.css'


interface Props {
    currentBooks:any
}


export default function BookList({currentBooks}: Props): ReactElement {
    return (
        <div className="container book-list-holder">
         <div className="row" style={{display:"flex",flexWrap:"wrap"}}> 
            {currentBooks.map((num:any)=><div className="col"><Link to={`/bookDetails/${num}`} style={{textDecoration: 'none'}} ><BookCard></BookCard></Link> </div>)}
            </div>
           
        </div>
    )
}
