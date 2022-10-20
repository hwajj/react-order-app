import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import {
  addToCart,
  removeFromCart,
  getCartTotal,
  emptyCart,
} from './modules/cart';
import { logIn, logOut } from './modules/login';
import ItemsContainer from './containers/ItemsContainer';
import Cart from './components/Cart/Cart';
import firebase from 'firebase/compat/app';
import { signInWithGoogle, signOutHandler } from './firebase';
import jwt_decode from 'jwt-decode';
import { useAuth } from './components/Login/useAuth';

function App() {
  //구글 로그인
  const [user, setUser] = useState({});
  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token : ' + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser((prev) => {
  //     return { ...prev, userObject };
  //   });
  //   console.log(user);

  //   document.getElementById('signInDiv').hidden = true;
  // }
  const auth = useAuth().auth;
  console.log(auth);
  const user_ = useAuth().user;

  useEffect(() => {
    /* global google */
    // async function test() {
    //   await google.accounts.id.initialize({
    //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //     callback: handleCallbackResponse,
    //   });
    //   await google.accounts.id.renderButton(
    //     document.getElementById('signInDiv'),
    //     {
    //       theme: 'outline',
    //       size: 'large',
    //     }
    //   );
    //   await google.accounts.id.prompt();
    // }
    // test();
    // const userInfo = {
    //   name: user.userObject?.name,
    //   email: user.userObject?.email,
    // };
    // dispatch(setUserInfo(userInfo));
    //console.log(auth);

    user_ &&
      dispatch(
        logIn({
          name: user_?.displayName,
          id: user_?.email,
          uid: user_?.uid,
          photo: user_?.photoURL,
        })
      );
  }, [user_]);

  const userInfo = useSelector((state) => state.login.user);
  //user 없음 -> 로그인버튼
  //user 있음 -> 로그아웃버튼

  //증가 감소
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const onIncrease = useCallback(
    (item) => {
      console.log(item);
      return dispatch(addToCart(item));
    },
    [dispatch]
  );
  const onDecrease = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch]
  );

  //주문페이지

  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    console.log(cartIsShown);
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  function logoutHandler(event) {
    signOutHandler(auth);
    dispatch(logOut());
    dispatch(emptyCart());
    document.getElementById('signInDiv').hidden = false;
  }
  const loginHandler = async () => {
    // console.log(auth);
    const user = await signInWithGoogle(auth);
    console.log(user);
    setUser((prev) => {
      return { ...prev, user };
    });

    console.log(user);
    console.log(user.photoURL);
    const userInfo_ = {
      name: user?.displayName,
      id: user?.email,
      uid: user?.uid,
      photo: user?.photoURL,
    };

    dispatch(logIn(userInfo_));
    document.getElementById('signInDiv').hidden = true;
  };

  return (
    <div>
      {cartIsShown && (
        <Cart
          items={items}
          onClose={hideCartHandler}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          total={getCartTotal}
          user={userInfo}
        />
      )}
      {/* <Login /> */}
      <div id='signInDiv'>
        <button onClick={loginHandler}>구글로 로그인</button>
      </div>
      {userInfo && Object.keys(userInfo).length != 0 && (
        <div>
          <h3> {userInfo?.name}</h3>
          <img src={userInfo?.photo} alt='프로필사진' />
          <button onClick={(e) => logoutHandler(e)}>로그아웃</button>
        </div>
      )}
      {/* {userInfo && (
        <div>
          <img src={userInfo.photo} alt='사진' />
          <h3>{userInfo.name}</h3>
        </div>
      )} */}
      <Header
        onShowCart={showCartHandler}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
      <Items onIncrease={onIncrease} />
    </div>
  );
}

export default App;
