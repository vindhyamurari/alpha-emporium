import React, { ReactElement, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import '.././styles/checkOut.css'
import {ToastContainer} from 'react-toastify'
import { useHistory, useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

interface Props {

}

export default function Checkout({}: Props): ReactElement {
  //get the stripe key from the server
const promise = loadStripe("pk_test_51IzgtYSCMgN4AzVBGEzeKvjxfmd4FQl6hPWIvdGP0wBB8bXfBExfQmKHOWK9hGAGZeOfr44s7mKNva3tRCnkRwU100H3OvZxNd");
const location:any=useLocation();
const history=useHistory();
const [goToCheckOut, setgoToCheckOut] = useState(false)
const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false);
    history.goBack();
  } 
  
  const handleShow = () => setShow(true);
  const handleNext=()=>{
    setShow(false);
    setgoToCheckOut(true)
  }

  useEffect(() => {
    handleShow();
  }, [])
  

  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you Sure to Purchase the Book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
{goToCheckOut?<div className="container card-payment-root">
      <Elements stripe={promise}>
        <CheckoutForm  from={location.state}/>
      </Elements>
    </div>:null}
    <ToastContainer/>
    </>
  );
}

