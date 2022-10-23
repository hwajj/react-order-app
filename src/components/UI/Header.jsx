import React, { useState, useRef } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import Login from '../Login/Login';
import OrderListButton from '../OrderList/OrderListButton';
import { getDatabase, ref, child, get } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';

const Header = ({ onShowCart, onShowOrderList, onLoadOrderList }) => {
  const [orderedList, setOrderedList] = useState([]);
  const setOrderedListFn = (prev) => !prev;

  const userInfo = useSelector((state) => state.login?.user);

  const getOrderListHandler = async () => {
    // const msg = await fetch(
    //   process.env.REACT_APP_FIREBASE + `/${userInfo.uid}.json`,
    //   {
    //     method: 'GET',
    //   }
    // );

    // console.log(msg);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${userInfo?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setOrderedList(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(typeof orderedList);

    //    // Attach an asynchronous callback to read the data at our posts reference
    // const starCountRef = ref(db, `/${userInfo?.uid}.json`);

    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   // updateStarCount(postElement, data);
    // });
  };
  const getOrderListContest = async () => {
    return Object.entries(orderedList).map((e) => e[1].addressInfo);
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.login}>
          <Login />
        </div>

        <h1 className={classes.title}> 시스터즈 샌드위치</h1>
        <div className={classes.orderList}>
          <OrderListButton
            onShowOrderList={onShowOrderList}
            onLoadOrderList={onLoadOrderList}
          />
        </div>
        <div className={classes.button}>
          <HeaderCartButton onShowCart={onShowCart} />
        </div>
      </header>
      {/* <div className={classes.headerImage}>
      <img src={sandwitchesImage} alt='샌드위치 사진' />
    </div> */}
    </>
  );
};
export default Header;
