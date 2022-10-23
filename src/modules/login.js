//액션 생성
const LOGIN = 'login/USER_LOGIN';
const LOGOUT = 'login/USER_LOGOUT';
const ADD_ADDRESS = 'login/USER_ADDRESS';
//액션생성함수
export const logIn = (user) => {
  console.log(user);
  return { type: LOGIN, user };
};

export const logOut = () => {
  return { type: LOGOUT };
};

export const addAddress = (address) => {
  return { type: ADD_ADDRESS, address };
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case LOGIN: {
      const user = action.user;

      return { ...state, user };
    }
    case LOGOUT: {
      console.log('logout');
      const emptyUser = {};
      return { ...state, user: {} };
    }
    case ADD_ADDRESS: {
      const user = state.user;

      const address = action.address;

      console.log(user);
      return { ...state, user: { ...user, address: action.address } };
    }
    default:
      return state;
  }
};

export default userReducer;
