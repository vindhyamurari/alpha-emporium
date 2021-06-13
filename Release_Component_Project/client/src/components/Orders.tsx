import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Toast from '../utils/helper'
import StarRating from './StarRating'
import * as Constants from '../Reducers/constants'
import OrderServices from '../Services/order-services'

interface Props {
    
}

export default function Orders({}: Props): ReactElement {
    const payment = useSelector((state:any) => state.payment)
    const history=useHistory();
    const toast=new Toast();
    const orderServices=new OrderServices();
    const user = useSelector((state:any)=> state.user)
    const dispatch = useDispatch()
    const [myOrders, setmyOrders] = useState([])

    useEffect(() => {
        orderServices.getAllOrdersOfUser(user.token)
            .then((res:any)=>{
                setmyOrders(res.data)
            })
            .catch((err:any)=>{
                toast.errorToast(err.message)
            })
    }, [])

    const proceedToCheckOut=(bookId:any,bookPrice:any)=>{
        if(user.token!==""){
            dispatch({type:Constants.SET_PURCHASE_DETAILS,payload:{totalAmount:bookPrice,itemsToPurchase:[bookId]}})
            history.push('/checkout',{from:'cart'});
        }
    }

    return (
        <>
        {myOrders.length===0?<h3>Loading</h3>:
            <div className="container cart-conatiner">
            <h5>Your Orders</h5>
            <div className="row"> 
                <div className="col-10">
                {myOrders.map((book:any)=>
                    <div className="row">
                    <hr></hr>
                        <div className="col-3 img-cointainer">
                            <img src={book.cover} alt="book-cover" className="book-cover"/>
                        </div>
                        <div className="col-5">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <span><StarRating rating={book.rating}></StarRating></span><br/><br/>
                        </div>
                        <div className="col-1 price">
                            <h5><i className="fa fa-inr" aria-hidden="true"></i> {book.price}</h5>
                        </div>
                        <div className="col-3">
                        <div style={{marginTop:'3.5vw'}}>
                        <button className="detail-btn" onClick={()=>proceedToCheckOut(book._id,book.price)} ><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Buy Again  </button>
                        </div>
                        </div>
                    </div>
                      )}
                </div>
                <div className="col-2">
                   
                </div>
            </div>
          
            <hr></hr>
            
        </div>}
        <ToastContainer/>
        </>
    )
}


