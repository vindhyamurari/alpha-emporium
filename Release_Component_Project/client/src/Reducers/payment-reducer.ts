import * as Constants from './constants';

const initalstate={
    totalAmount:0,
    itemsToPurchase:[],
    cartItems:[]
}

const paymentReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.SET_PURCHASE_DETAILS:
            return {...state,totalAmount:action.payload.totalAmount,itemsToPurchase:action.payload.itemsToPurchase}
        case Constants.SET_CART_ITEMS:
            return {...state,cartItems:action.payload}
        default:
            return state;
    }
}

export default paymentReducer;