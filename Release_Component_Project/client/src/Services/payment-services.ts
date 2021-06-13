import axios from 'axios'

class PaymentServices{

    makePayment=async (amount:any,token:any)=>{
        let response =await axios.post(`http://localhost:8000/api/payment/process`,{amount},
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }
}

export default PaymentServices;