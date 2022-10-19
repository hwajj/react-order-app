//여러개의 리듀서 통합
import { combineReducers } from 'redux';
import cart from './cart';
import googleReducer from './login';

const rootReducer = combineReducers({
  cart,
  login: googleReducer,
});

export default rootReducer;
