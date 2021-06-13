import * as Constants from './constants';

const initalstate={
    books:[],
    searchedBooks:[],
    searchBy:'',
    searchInput:''
}

const bookReducer =(state:any=initalstate,action:any)=>{
    switch(action.type){
        case Constants.SET_ALL_BOOKS:
            return {...state,books:action.payload}
        case Constants.SET_SEARCH_BY:
            return {...state,searchBy:action.payload}
        case Constants.SET_SEARCH_INPUT:
             return {...state,searchInput:action.payload}
        case Constants.SET_SEARCHED_BOOKS:
            return {...state,searchedBooks:action.payload}
        default:
            return state;
    }
}

export default bookReducer;