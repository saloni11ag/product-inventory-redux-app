import { combineReducers } from 'redux';
import productreducer from './productreducer';

const allReducers = combineReducers({
    getProduct: productreducer
})

export default allReducers