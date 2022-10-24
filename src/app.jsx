import './App.css';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from 'firebase/database';
import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import { addToCart, removeFromCart, getCartTotal } from './modules/cart';
import Cart from './components/Cart/Cart';

import OrderList from './components/OrderList/OrderList';

function App() {
  const userInfo = useSelector((state) => state.login.user);

  //주문목록
  const [orderedList, setOrderedList] = useState([]);
  const [orderListIsShown, setOrderListIsShown] = useState(false);
  const showOrderListHandler = () => {
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
          setOrderedList(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //user 없음 -> 로그인버튼
  //user 있음 -> 로그아웃버튼

  //증가 감소
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const onIncrease = useCallback(
    (item) => {
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
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
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
        userInfo={userInfo}
        onShowCart={showCartHandler}
        onShowOrderList={showOrderListHandler}
        onLoadOrderList={loadOrderList}
      />
      <Items onIncrease={onIncrease} />
    </div>
  );
}

export default App;
