import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from 'firebase/database';
import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import {
  addToCart,
  removeFromCart,
  getCartTotal,
  emptyCart,
} from './modules/cart';
import Cart from './components/Cart/Cart';

import { useAuth } from './components/Login/useAuth';
import OrderList from './components/OrderList/OrderList';

import Login from './components/Login/Login';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

function App() {
  const auth = useAuth().auth;
  console.log(auth);

  const user_ = useAuth().user;
  const userInfo = useSelector((state) => state.login?.user);

  //주문목록

  const [orderedList, setOrderedList] = useState([]);
  const [orderListIsShown, setOrderListIsShown] = useState(false);
  const showOrderListHandler = () => {
    console.log(cartIsShown);
    setOrderListIsShown(true);
  };

  const hideOrderListHandler = () => {
    setOrderListIsShown(false);
  };

  const loadOrderList = () => {
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
    const address = Object.entries(orderedList).map((e) => e[1].addressInfo);
    console.log(orderedList);
  };

  useEffect(() => {}, [userInfo?.uid, orderedList]);

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

  // const getOrderListHandler = async () => {
  //   // const msg = await fetch(
  //   //   process.env.REACT_APP_FIREBASE + `/${userInfo.uid}.json`,
  //   //   {
  //   //     method: 'GET',
  //   //   }
  //   // );

  //   // console.log(msg);
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `/${userInfo?.uid}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //         setOrderedList(snapshot.val());
  //       } else {
  //         console.log('No data available');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   console.log(typeof orderedList);

  //   //    // Attach an asynchronous callback to read the data at our posts reference
  //   // const starCountRef = ref(db, `/${userInfo?.uid}.json`);

  //   // onValue(starCountRef, (snapshot) => {
  //   //   const data = snapshot.val();
  //   //   console.log(data);
  //   //   // updateStarCount(postElement, data);
  //   // });
  // };
  const getOrderListContest = async () => {
    return;
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

      {orderListIsShown && (
        <OrderList orderedList={orderedList} onClose={hideOrderListHandler} />
      )}
      <Header
        onShowCart={showCartHandler}
        onShowOrderList={showOrderListHandler}
        onLoadOrderList={loadOrderList}
      />
      <Items onIncrease={onIncrease} />
    </div>
  );
}

export default App;
