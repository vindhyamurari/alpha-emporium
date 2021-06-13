import axios from 'axios';

class OrderServices{

    addNewOrder=async (orderDetails:any,token:any)=>{
        let response =await axios.post(`http://localhost:8000/api/order/new`,orderDetails,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    getAllOrdersOfUser=async (token:any)=>{
        let response =await axios.get(`http://localhost:8000/api/order`,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    adminGetAllUsersOrders=async (token:any)=>{
        let response =await axios.get(`http://localhost:8000/api/order/admin/orders`,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }
}
export default OrderServices;