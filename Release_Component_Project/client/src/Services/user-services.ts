import axios from 'axios';
import * as Constants from '../Reducers/constants';

class UserServices{

    registerUser=async (register:any) =>{
        let response =await axios.post('http://localhost:8000/api/user/register',register);
        return response;
    }

    loginUser=async (login:any,dispatch:any)=>{
        try{
            let response =await axios.post('http://localhost:8000/api/user/login',login)
            dispatch({type:Constants.USER_LOGIN,payload:response.data});
            console.log(`response.data`, response.data)
            return response.data;
        }
        catch(error){
            return error;
        }
    }
}

export default UserServices;