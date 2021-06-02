import axios from 'axios';
import * as Constants from '../Reducers/constants';

class UserServices{

    registerUser=async (register:any) =>{
        try{
            let response =await axios.post('http://localhost:8000/api/user/register',register)
            return response.data;
        }
        catch(error){
            return error;
        }
    }

    loginUser=async (login:any,dispatch:any)=>{
        try{
            let response =await axios.post('http://localhost:8000/api/user/login',login)
            dispatch({type:Constants.USER_LOGIN,payload:response.data});
            return response.data;
        }
        catch(error){
            return error;
        }
    }
}

export default UserServices;