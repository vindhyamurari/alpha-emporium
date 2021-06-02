// import {createStore, combineReducers,applyMiddleware} from 'redux';
// import userReducer from './user-reducer';
// import * as Constants from './constants';



// const reducers=combineReducers({
//     user: userReducer,
// });


// export default createStore(reducers,applyMiddleware());

import {compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import userReducer from './user-reducer';

const initialState={};

const reducers=combineReducers({
        user: userReducer,
    });

const store=createStore(reducers,initialState,
    compose(
        applyMiddleware(thunk),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
   );

export default store;