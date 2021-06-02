import * as Constants from './constants';

const initalstate={
    loggedInUser:{},
    token:''
}

const userReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.USER_LOGIN:
            return {...state,token:action.payload.token,loggedInUser:action.payload.user}
        case Constants.USER_LOGOUT:
            return {...state,loggedInUser:{}}
        default:
            return state;
    }
}

export default userReducer;