import React, { ReactElement } from "react";
import '../../styles/flipCard.css'
import Rich from '../../Images/book.png'
import Avatar from 'react-avatar';
import authorImg from '../../Images/vivek.jpeg'
import StarRating from '../StarRating'
interface Props {}

export default function BookCard({}: Props): ReactElement {
  return (
      <div className="flip-card" style={{display:'inline-block'}}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              className="book-card-img"
              src={Rich}
              alt="Avatar"
              // style={{width: "15vw", height: "22vw", borderRadius: '0.5vw',}}
            />
          </div>
          <div className="flip-card-back">
          <Avatar className="author-image" src={authorImg} size="100" round={true} style={{marginTop:'1.2vw'}}/>
            <h5 className="title">The Accursed God</h5>
            <p className="card-back-text">Vivek Dutta Mishra</p>
            <p className="card-back-text">Book Price :  <i className="fa fa-inr" aria-hidden="true"></i>  <b>350</b></p>
            <p className="card-back-text"><StarRating rating={5}></StarRating></p>
          </div>
        </div>
      </div>
  );
}
