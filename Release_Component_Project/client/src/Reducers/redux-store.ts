import {compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import userReducer from './user-reducer';
import pageReducer from './page-reducer';
import bookReducer from './book-reducer';
import paymentReducer from './payment-reducer';

const initialState={};

const reducers=combineReducers({
        user: userReducer,
        page: pageReducer,
        book:bookReducer,
        payment:paymentReducer
    });

const store=createStore(reducers,initialState,
    compose(
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
   );

export default store;