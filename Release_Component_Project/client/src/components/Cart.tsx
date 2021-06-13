import React, { ReactElement, useEffect, useState } from 'react'
import StarRating from './StarRating'
import '../styles/cart.css'
import { useHistory } from 'react-router'
import CartServices from '../Services/cart-services'
import Toast from '../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import * as Constants from '../Reducers/constants'


interface Props {
    
}

export default function Cart({}: Props): ReactElement {
    
    const [cartBooks, setcartBooks] = useState<any>([])
    const [displyCheckout, setdisplyCheckout] = useState(true)
    const cartServices=new CartServices();
    const toast=new Toast();
    const user = useSelector((state:any)=> state.user)
    const dispatch = useDispatch()
    const payment = useSelector((state:any )=> state.payment)
    const loadCartItems=()=>{
        // try{
        //     let res=await cartServices.getAllItemsOfCart(user.loggedInUser.id);
        //     setcartBooks(res.data)
        //     dispatch({type:Constants.SET_CART_ITEMS,payload:res.data})
        // }
        // catch(err){
        //     toast.errorToast(err.message)
        // }
        console.log(`user.loggedInUser.id`, user.loggedInUser.id)
        cartServices.getAllItemsOfCart(user.loggedInUser.id)
            .then((res:any)=>{
                setcartBooks(res.data)
                dispatch({type:Constants.SET_CART_ITEMS,payload:res.data})
            })
            .catch((err:any)=>{
                toast.errorToast(err.message)
            })
        
    }

    useEffect(() => {
        loadCartItems();
        if(payment.cartItems.length===0){
            setdisplyCheckout(false)
        }
        else{
            setdisplyCheckout(true);
        }
    },[])

    let calculatingQtyArray:any=[]
    payment.cartItems.forEach((book:any)=>calculatingQtyArray.push(1))
    console.log(`calculatingQtyArray`, calculatingQtyArray)
    const [qtyArray, setqtyArray] = useState(calculatingQtyArray)
    const history=useHistory();
    const [currentQty, setcurrentQty] = useState(1)
    const [totalPrice, settotalPrice] = useState(0)
    const [totalItems, settotalItems] = useState(1)

    const totalCostAndItems=()=>{
        let total=0,items=0
        for(let i=0;i<payment.cartItems.length;i++){
            total+=payment.cartItems[i].price*qtyArray[i]
            items+=qtyArray[i]
        }
        settotalPrice(total);
        settotalItems(items);
    }
    const deletitemInCart=(bookId:any)=>{
        cartServices.deleteBookFromCart(bookId,user.token)
            .then((res:any)=>{
                if(res.status===200){   
                loadCartItems();
              }
            })
            .catch((err:any)=>{
                toast.errorToast('Couldnt Remove item')
            })
            if(payment.cartItems.length===0){
                setdisplyCheckout(false)
            }
            else{
                setdisplyCheckout(true);
            }
    }

    const QuantityInputEvent=(e:any)=>{
        setcurrentQty(Number(e.target.value))
    }

    const whichBooksQty=(bookId:any)=>{
        let index=-1;
        for(let i=0;i<payment.cartItems.length;i++){
            if(bookId===payment.cartItems[i]._id)
                index=i;
        }
        let newQtyArray=qtyArray;
        newQtyArray[index]=currentQty;
        setqtyArray(newQtyArray);
        totalCostAndItems();
    }

    const proceedToCheckOut=()=>{
        if(user.token!==""){
            let cartItemIds=payment.cartItems.map((item:any)=>item._id);
            dispatch({type:Constants.SET_PURCHASE_DETAILS,payload:{totalAmount:totalPrice,itemsToPurchase:cartItemIds}})
            history.push('/checkout',{from:'cart'});
        }
    }

    console.log(`qtyArray`, qtyArray)

    useEffect(() => {
        totalCostAndItems()
    })

    
    return (
        <>{payment.cartItems!==[]?
        <div className="container cart-conatiner">
            <h5>Shipping Cart</h5>
            <div className="row"> 
                <div className="col-10">
                {payment.cartItems.map((book:any)=>
                    <div className="row">
                    <hr></hr>
                   
                        <div className="col-3 img-cointainer">
                            <img src={book.cover} alt="book-cover" className="book-cover"/>
                        </div>
                        <div className="col-6">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <span><StarRating rating={book.rating}></StarRating></span><br/><br/>
                            <span>Quantity : </span><input type="number" min="1" max="100" step="1" placeholder="1" onChange={QuantityInputEvent} onKeyUp={()=>whichBooksQty(book._id)} className="quantity" />
                        </div>
                        <div className="col-1 price">
                            <h5><i className="fa fa-inr" aria-hidden="true"></i> {book.price}</h5>
                        </div>
                        <div className="col-1">
                            <span style={{cursor:'pointer'}} onClick={()=>deletitemInCart(book._id)}><i className="fa fa-times fa-2x del-icon" aria-hidden="true"></i></span>
                        </div>
                    </div>
                      )}
                </div>
                <div className="col-2" /* style={{border:'1px solid grey'}} */>
                    <div className="checkout-btn-div">
                        <p className="total-items-at-checkout">Total items : {totalItems} </p> 
                        <p className="total-price-at-checkout">MRP : {totalPrice} <i className="fa fa-inr" aria-hidden="true"></i></p>
                        {displyCheckout?<button className="detail-btn"  onClick={()=>proceedToCheckOut()} ><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Checkout  </button>:
                        <button className="detail-btn"  disabled ><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Checkout  </button>}
                        </div>
                </div>
            </div>
          
            <hr></hr>
            <h4 className="total-price">Total Price : {totalPrice}</h4>
            <ToastContainer/>
        </div>
        :<h3>Loading</h3>}
     </>
    )
}
