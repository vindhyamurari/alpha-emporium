import axios from 'axios';
import * as Constants from '../Reducers/constants';

class UserServices{

    registerUser=async (register:any) =>{
        let response =await axios.post('http://localhost:8000/api/user/register',register);
        return response;
    }

    loginUser=async (login:any)=>{
        let response =await axios.post('http://localhost:8000/api/user/login',login)
         return response;
    
    }
}

export default UserServices;