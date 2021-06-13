import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import BookCard from './BookCard'
import '../../styles/bookList.css'
import { useSelector } from 'react-redux'


interface Props {
    currentBooks:any
}


export default function BookList({currentBooks}: Props): ReactElement {
    const user = useSelector((state :any)=> state.user)
    const [isAdmin, setisAdmin] = useState(false)
    const history=useHistory();
    const book = useSelector((state :any)=> state.book)
    console.log(currentBooks)
    useEffect(() => {
       if(currentBooks.length===1) 
       {
           history.push(`/bookDetails/${currentBooks[0]._id}`)
       }
    }, [book])
     useEffect(() => {
       if (user.token != "") {
         if(user.loggedInUser.role==='admin')
            setisAdmin(true)
          else
            setisAdmin(false)
       }
    },[user.token]);
    return (
        <div className="container book-list-holder">
         <div className="row" style={{display:"flex",flexWrap:"wrap"}}> 
            {currentBooks.map((book:any)=>
                <div className="col">
                    {isAdmin ? <Link to={`/admin/bookDetails/${book._id}`}><BookCard book={book}></BookCard></Link>:
                         <Link to={`/bookDetails/${book._id}`} style={{textDecoration: 'none'}} >
                         <BookCard book={book}></BookCard>
                     </Link> 
                    }
                   
                </div>
            )}
            </div>
        </div>
    )
}
