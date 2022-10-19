//여러개의 리듀서 통합
import { combineReducers } from 'redux';
import cart from './cart';

const rootReducer = combineReducers({
  cart,
});

export default rootReducer;
