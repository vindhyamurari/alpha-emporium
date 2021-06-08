import React, { ReactElement } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import '.././styles/checkOut.css'

interface Props {}

export default function Checkout({}: Props): ReactElement {
//   let checkoutProducts = { totalAmount: 350 };
//   const handleToken = (token?: any, address?: any) => {
//     console.log(`token`, token);
//     console.log(`address`, address);
//   };
const promise = loadStripe("pk_test_51IzgtYSCMgN4AzVBGEzeKvjxfmd4FQl6hPWIvdGP0wBB8bXfBExfQmKHOWK9hGAGZeOfr44s7mKNva3tRCnkRwU100H3OvZxNd");
  return (
    <div className="container card-payment-root">
      {/* <StripeCheckout
                    stripeKey="pk_test_51IzgtYSCMgN4AzVBGEzeKvjxfmd4FQl6hPWIvdGP0wBB8bXfBExfQmKHOWK9hGAGZeOfr44s7mKNva3tRCnkRwU100H3OvZxNd"
                    token={handleToken}
                    shippingAddress
                    billingAddress
                    amount={checkoutProducts.totalAmount}
                /> */}
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
{
  /*<script>
 document.addEventListener('DOMContentLoaded',async ()=>{
   let response=await fetch("food.xml");
   let xmlString=await response.text();
   let parser=new DOMParser();
   let xml=parser.parseFromString(xmlString,"application/xml");
   let foods=xml.getElementsByTagName('food');
   let tbody=document.getElementById('table-body');

   for(let i=0;i<foods.length;i++){
        let name=foods[i].querySelector('name').innerHTML;
        let price=foods[i].querySelector('price').innerHTML;
        let cals=foods[i].querySelector('calories').innerHTML;
        
        let row=
        `<tr>
            <td>${name}</td>
            <td>${price}</td>
            <td>${cals}</td>
        </tr>
            `
        tbody.innerHTML+=row;
   }

})
</script> */
}
