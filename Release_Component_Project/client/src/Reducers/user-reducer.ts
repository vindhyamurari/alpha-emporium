import * as Constants from './constants';

const initalstate={
    loggedInUser:{}
}

const userReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.USER_LOGIN:
            return {...state,loggedInUser:action.payload}
        case Constants.USER_LOGOUT:
            return {...state,loggedInUser:{}}
        default:
            return state;
    }
}

export default userReducer;