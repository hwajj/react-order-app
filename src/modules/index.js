//여러개의 리듀서 통합
import { combineReducers } from 'redux';
import cart from './cart';
import userReducer from './login';

const rootReducer = combineReducers({
  cart,
  login: userReducer,
});

export default rootReducer;
