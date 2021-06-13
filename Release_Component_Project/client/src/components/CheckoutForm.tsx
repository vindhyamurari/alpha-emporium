import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import PaymentServices from "../Services/payment-services";
import { useSelector } from "react-redux";
import Toast from '../utils/helper'
import { ToastContainer } from "react-toastify";
import OrderServices from "../Services/order-services";
import { useHistory } from "react-router-dom";
import CartServices from "../Services/cart-services";

interface Props{
 from:any
}

export default function CheckoutForm({from}:Props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState('');
  const stripe :any= useStripe();
  const history : any=useHistory();
  const elements :any= useElements();
  const paymentServices=new PaymentServices();
  const orderServices=new OrderServices();
  const cartServices=new CartServices();
  const toast=new Toast();
  const user = useSelector((state:any) => state.user)
  const payment = useSelector((state:any) => state.payment)
  console.log(`from`, from)

  useEffect(() => {
    paymentServices.makePayment(payment.totalAmount*100,user.token)
      .then((res)=>{
        if(res.status===200){
          setClientSecret(res.data.client_secret)
        }
      })
      .catch((err)=>{
        toast.errorToast(err.message)
      })
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event:any) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (e:any )=> {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: email,
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError('');
      setProcessing(false);
      setSucceeded(true);
      toast.successToast('Payment Successful');
      console.log(`ClientSecret`, clientSecret)
      let paymentDetails={totalPrice:Number(payment.totalAmount*100),orderItems:payment.itemsToPurchase,paymentInfo:clientSecret}
      orderServices.addNewOrder(paymentDetails,user.token)
      .then((res:any)=>{
          console.log('Order Successful')
          if(from!=undefined){
            if(from.from==="cart"){
              cartServices.clearCartAfterPurchase(user.loggedInUser.id,user.token)
                .then((res:any)=>{
                  console.log('Cart Cleared')
                  toast.infoToast('Order Confirmed ! Book Arriving Soon')
                  history.push('/');
                })
                .catch((err:any)=>{
                  console.log('Error while clearing the cart',err.messge)
                })
            }
          }
          history.push('/');
      })
      .catch((err:any)=>{
          console.log('Error while updting orders to db',err.message)
      })
    }
  };

  return (
    <>
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        className="card-input"
      />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        className="card-button"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
        {/* <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again. */}
      </p>
    </form>
    <ToastContainer/>
    </>
  );
}
