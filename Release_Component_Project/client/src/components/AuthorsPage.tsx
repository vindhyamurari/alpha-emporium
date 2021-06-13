import React, { ReactElement, useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { useParams } from 'react-router-dom';
import '../styles/authorsPage.css'
import BookServices from "../Services/book-services";
import { ToastContainer } from 'react-toastify';
import Toast from '../utils/helper'
interface Props {
    
}

interface MatchParams {
    authorName: string;
  }
  

export default function AuthorsPage({}: Props): ReactElement {

    const { authorName } = useParams<MatchParams>();
    const [author , setauthor] = useState<any>(null)
    const toast=new Toast();
    
    const bookServices=new BookServices();
    // let author={
    //     listOfBooks: [
    //         "The Accursed God"
    //       ],
    //       interests: [
    //           "speaker",
    //            "influencer",
    //           "educator",
    //           "writer",
    //           "software developer"
    //       ],
    //     image:"https://images-na.ssl-images-amazon.com/images/I/71jyQV8ZgdL._SY600_.jpg",
    //       name: "Vivek Dutta Mishra"
    // }

    useEffect(() => {
        bookServices.getAuthorDetails(authorName)
        .then((res)=>{
            if(res.status===200){
                setauthor(res.data)
                console.log(res.data)
                console.log(author)
            }
          })
          .catch((err)=>{
            toast.errorToast(err.message)
          })
    }, [])
    return (
        <>
        {author===null?<h3>Loading</h3>:
        <div className="container">
        <div className="row author-details-row">
            <div className="col-4">
                <Avatar src={author.image} size="230" round={true} style={{marginTop:'1.2vw'}}/>
                <h4 className="author-name">{author.name}</h4>
            </div>
            <div className="col">
                <h5>List Of Books</h5>
            <ol className="list-group list-group-numbered list-of-books">
                {author.listOfBooks.map((book:any)=><li className="list-group-item each-item">{book}</li>)}
            </ol>
            </div>
            <div className="col-4">
            <h5 style={{marginLeft:'12vw'}}>Intrests</h5>
                <ul className="list-group list-group-flush intrests">
                    {author.interests.map((intrest:any)=><li className="list-group-item each-item">{intrest}</li>)}
                </ul>
            </div>
        </div>
    </div>}
    <ToastContainer></ToastContainer>
    </>  
    )
}
