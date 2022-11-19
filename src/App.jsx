import './App.css';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, child, get } from 'firebase/database';
import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import useCart from './components/Hook/useCart';
import { getCartTotal } from './utils/utils';
import Cart from './components/Cart/Cart';

import OrderList from './components/OrderList/OrderList';

function App() {
  const userInfo = useSelector((state) => state.login.user);

  //주문목록
  const { addToCart, removeFromCart } = useCart();
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
          onIncrease={addToCart}
          onDecrease={removeFromCart}
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
      <Items onIncrease={addToCart} />
    </div>
  );
}

export default App;
