import React from 'react';
import classes from './Login.module.css';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithGoogle, signOutHandler } from '../../firebase';
import { useAuth } from '../../components/Login/useAuth';
import { logIn, logOut } from '../../modules/login';
import { emptyCart } from '../../modules/cart';

const Login = (props) => {
  const dispatch = useDispatch();
  const auth = useAuth().auth;
  const user_ = useAuth().user;
  const userInfo = useSelector((state) => state.login?.user);
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

  useEffect(() => {
    user_ &&
      dispatch(
        logIn({
          name: user_?.displayName,
          id: user_?.email,
          uid: user_?.uid,
          photo: user_?.photoURL,
        })
      );

    // userInfo && auth.createUserWithEmailAndPassword(userInfo.id, userInfo.uid);
  }, [user_]);

  return (
    <div className={classes.loginContainer}>
      {!userInfo ||
        (Object.keys(userInfo).length == 0 && (
          <div id='signInDiv'>
            <button onClick={loginHandler}>구글로 로그인</button>
          </div>
        ))}
      {userInfo && Object.keys(userInfo).length != 0 && (
        <div className={classes.userInfo}>
          <h3> {userInfo?.name} 님 반갑습니다</h3>
          <button onClick={(e) => logoutHandler(e)}>로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default Login;
