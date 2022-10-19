//액션 생성
const LOGIN_USER_INFO = 'login/USER';

//액션생성함수
export const setUserInfo = (user) => {
  console.log(user);
  return { type: LOGIN_USER_INFO, user };
};

const initialState = {};

const googleReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_USER_INFO: {
      const user = action.user;
      console.log(action);
      console.log(state);
      return { ...state, user };
    }
    default:
      return state;
  }
};

export default googleReducer;
