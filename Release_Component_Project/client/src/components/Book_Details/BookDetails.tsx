import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBookDetails from "./SingleBookDetails";
import BookServices from "../../Services/book-services";
import { useDispatch, useSelector } from "react-redux";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {}

interface MatchParams {
  paramId: string;
}

export default function BookDetails({}: Props): ReactElement {
  const { paramId } = useParams<MatchParams>();
  const [singleBook, setsingleBook] = useState(null)
  const bookServices=new BookServices();
  const dispatch = useDispatch()
  const book = useSelector((state :any)=> state.book)
  console.log('I am coming hereeeeeee')

  const loadBookById=()=>{
    bookServices.getBookById(paramId)
      .then((res)=>{
        if(res.status===200){
          setsingleBook(res.data)
          console.log('in then.................')
          console.log(`res.data`, res.data)
        }
        else{
          toast.info(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err:any)=>{

          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      })
  }
  useEffect(() => {
    loadBookById();
  },[])

  return (
    <>
    {singleBook!==null?<SingleBookDetails book={singleBook} getBookById={loadBookById}></SingleBookDetails>:
    <h3>Loading</h3>}
      <ToastContainer></ToastContainer>
    </>
  );
}
