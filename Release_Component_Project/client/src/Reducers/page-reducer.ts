import * as Constants from './constants';

const initalstate={
    pageNumber:1
}

const pageReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.PAGE_NUMBER:
            return {...state,pageNumber:action.payload}
        default:
            return state;
    }
}

export default pageReducer;