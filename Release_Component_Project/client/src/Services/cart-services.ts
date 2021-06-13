import axios from 'axios'

class CartServices{
    addBookToCart=async (bookId:any,token:any)=>{
        let response =await axios.put(`http://localhost:8000/api/cart/${bookId}`,{},
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }
    
    deleteBookFromCart=async (bookId:any,token:any)=>{
        let response =await axios.delete(`http://localhost:8000/api/cart/${bookId}`,
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return response;
    }

    getAllItemsOfCart=async (id:any)=>{
        let response =await axios.post(`http://localhost:8000/api/cart`,{id})
        console.log(`response`, response)
        return response;
    }

    clearCartAfterPurchase=async (id:any,token:any)=>{
        let response =await axios.put(`http://localhost:8000/api/cart/clear`,{id},
        {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        console.log(`response`, response)
        return response;
    }
}

export default CartServices