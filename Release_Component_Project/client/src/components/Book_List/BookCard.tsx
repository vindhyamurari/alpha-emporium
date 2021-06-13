import React, { ReactElement, useEffect } from "react";
import '../../styles/flipCard.css'
import Rich from '../../Images/book.png'
import Avatar from 'react-avatar';
import authorImg from '../../Images/vivek.jpeg'
import StarRating from '../StarRating'
import { useDispatch,useSelector } from "react-redux";
import * as Constants from '../../Reducers/constants'

interface Props {
  book:any
}

export default function BookCard({book}: Props): ReactElement {
  const dispatch = useDispatch();
  const bookState = useSelector((state :any)=> state.book)
  return (
      <div className="flip-card" style={{display:'inline-block'}}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              className="book-card-img"
              src={book.cover}
              alt={book.title}
            />
          </div>
          <div className="flip-card-back">
          <Avatar className="author-image" src={book.authorImage} name={book.author} size="100" round={true} style={{marginTop:'1.2vw'}}/>
            <h5 className="title">{book.title}</h5>
            <p className="card-back-text">{book.author}</p>
            <p className="card-back-text">Book Price :  <i className="fa fa-inr" aria-hidden="true"></i>  <b>{book.price}</b></p>
            <p className="card-back-text"><StarRating rating={book.ratings}></StarRating></p>
          </div>
        </div>
      </div>
  );
}
