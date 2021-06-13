import React, { ReactElement, useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { makeStyles } from "@material-ui/core/styles";
import { MyVerticallyCenteredModal } from "../Popup";
import { useHistory, useParams } from "react-router-dom";
import "../../styles/adminBookDetails.css"
import Rich from "../../Images/book.png"
import BookServices from '../../Services/book-services';
import { ToastContainer } from 'react-toastify';
import Toast from '../../utils/helper'
import { useSelector } from 'react-redux';

interface Props {
    
}

const useStyles = makeStyles((theme) => ({
    margin: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      width: 250,
    },
    button: {
      marginLeft: theme.spacing(2),
    },
  }));
  interface MatchParams {
    paramId: string;
  }

export default function AdminBookDetails({}: Props): ReactElement {

    //fetch the get book by Id
  const { paramId } = useParams<MatchParams>();
  const classes = useStyles();
  const [book, setbook] = useState<any>({})
  const bookServices=new BookServices();
  const toast=new Toast();
  const user = useSelector((state:any) => state.user)

  const loadBookById=()=>{
    bookServices.getBookById(paramId)
      .then((res:any)=>{
        if(res.status===200){
          setbook(res.data)
          console.log('in then.................')
          console.log(`res.data`, res.data)
        }
        else{
            toast.infoToast(res.message);
        }
      })
      .catch((err:any)=>{
        if(err.response.message){
            toast.errorToast(err.response.message)
        }
        else{
            toast.errorToast(err.message)
        }
      })
  }
  useEffect(() => {
    loadBookById();
  },[])

  console.log(`book`, book)
 
    const [stock, setstock] = useState(book.stock) //take from boook as params
    const [rating, setrating] = useState(book.ratings) //take from boook as params
    const [votes, setvotes] = useState(book.votes)
    const [discount, setdiscount] = useState(book.discount)
    const history=useHistory();

    const inputStock=(e:any)=>{
        setstock(e.target.value)
    }
    const inputRating=(e:any)=>{
        setrating(e.target.value)
    }

    const inputVotes=(e:any)=>{
        setvotes(e.target.value)
    }
    const inputDiscount=(e:any)=>{
        setdiscount(e.target.value)
    }

    const submitStock=()=>{
        bookServices.adminUpdateBook(paramId,{stock},user.token)
            .then((res:any)=>{
                if(res.status===200)
                    toast.successToast('Stock Updated Successfully')
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
    }
    const submitRating=()=>{
        console.log(`rating from submit rating`, rating )
        bookServices.adminUpdateBook(paramId,{ratings:rating},user.token)
            .then((res:any)=>{
                if(res.status===200){
                    toast.successToast('Rating Updated Successfully')
                    console.log('submitted rating')
                }
                    
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
    }
    const submitVotes=()=>{
        bookServices.adminUpdateBook(paramId,{votes},user.token)
            .then((res:any)=>{
                if(res.status===200)
                    toast.successToast('Votes Updated Successfully')
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
    }
    const submitDiscount=()=>{
        bookServices.adminUpdateBook(paramId,{discount},user.token)
            .then((res:any)=>{
                if(res.status===200)
                    toast.successToast('Discount Updated Successfully')
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
    }

    const updateAllFields=(e:any)=>{
        e.preventDefault();
        let updateFields={
            stock:stock||book.stock,
            votes:votes||book.votes,
            ratings:rating||book.ratings,
            discount:discount||book.discount
        }
        console.log(`updateFields`, updateFields)
        bookServices.adminUpdateBook(paramId,updateFields,user.token)
            .then((res:any)=>{
                if(res.status===200){
                    console.log(`res`, res)
                    toast.successToast('All details Updated')
                }
                   
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
        
    }
    const deleteBook=()=>{
        bookServices.adminDeleteBook(paramId,user.token)
            .then((res:any)=>{
                toast.successToast(res.message)
                history.push("/")
            })
            .catch((err:any)=>{
                if(err.response.message)
                    toast.errorToast(err.response.message)
                else
                    toast.errorToast(err.message)
            })
    }

    return (
        <div className="conatiner admin-book-details-container">
            <div className="row">
                <div className="col-4">
                    <img src={book.cover} alt="book-cover" className="book-image image-section"></img><br/><br/>
                    <button className="delete-btn image-section" onClick={()=>deleteBook()}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;&nbsp; Delete Book </button>
                </div>
                <div  className="col-8">
                    <form onSubmit={(e)=>updateAllFields(e)}>
                    <div>
                        <label>Stock</label><br/>
                        <TextField
                            autoComplete="off"
                            type="number"
                            name="stock"
                            onChange={inputStock}
                            className={classes.margin}
                            placeholder={book.stock}
                        />
                        <Fab
                            size="small"
                            aria-label="add"
                            onClick={submitStock}
                            style={{ marginTop: "2vw" }}
                        >
                            <CheckRoundedIcon/>
                        </Fab>
                   
                    </div>
                    <div>
                    <label>Rating</label><br/>
                        <TextField
                            autoComplete="off"
                            type="number"
                            name="rating"
                            onChange={inputRating}
                            className={classes.margin}
                            placeholder={book.ratings}
                        />
                        <Fab
                            size="small"
                            aria-label="add"
                            onClick={submitRating}
                            style={{ marginTop: "2vw" }}
                        >
                            <CheckRoundedIcon/>
                        </Fab>
                   
                    </div>
                    <div>
                    <label>Votes</label><br/>
                        <TextField
                            autoComplete="off"
                            type="number"
                            name="votes"
                            onChange={inputVotes}
                            className={classes.margin}
                            placeholder={book.votes}
                        />
                        <Fab
                            size="small"
                            aria-label="add"
                            onClick={submitVotes}
                            style={{ marginTop: "2vw" }}
                        >
                            <CheckRoundedIcon/>
                        </Fab>
                    </div>
                    <div>
                    <label>Discount</label><br/>
                        <TextField
                            autoComplete="off"
                            type="number"
                            name="discount"
                            onChange={inputDiscount}
                            className={classes.margin}
                            placeholder={book.discount}
                        />
                        <Fab
                            size="small"
                            aria-label="add"
                            onClick={submitDiscount}
                            style={{ marginTop: "2vw" }}
                        >
                            <CheckRoundedIcon/>
                        </Fab>
                    </div>
                    <button className="delete-btn image-section" style={{marginTop:'4vw'}} type="submit"><i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp; Update All </button>
                </form>
            </div>
        </div>
        <ToastContainer></ToastContainer>
        </div>
    )
}
