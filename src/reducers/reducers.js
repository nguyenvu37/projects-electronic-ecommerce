import addToCart from './addToCart';
import search from './search';
import deleteProduct from './deleteProductCart';
import checkout from './checkout';
import { combineReducers } from 'redux';


const reducers = combineReducers({
    search,
    addToCart,
    deleteProduct,
    checkout
});

export default reducers;