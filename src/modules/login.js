//액션 생성
const LOGIN = 'login/USER_LOGIN';
const LOGOUT = 'login/USER_LOGOUT';
//액션생성함수
export const logIn = (user) => {
  console.log(user);
  return { type: LOGIN, user };
};

export const logOut = () => {
  return { type: LOGOUT };
};

const initialState = {};

const googleReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN: {
      const user = action.user;
      console.log(action);
      console.log(state);
      console.log(user);
      return { ...state, user };
    }
    case LOGOUT: {
      console.log('logout');
      const emptyUser = {};
      return { ...state, user: {} };
    }

    default:
      return state;
  }
};

export default googleReducer;
