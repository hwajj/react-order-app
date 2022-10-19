import './App.css';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import { addToCart, removeFromCart, getCartTotal } from './modules/cart';
import ItemsContainer from './containers/ItemsContainer';
import Cart from './components/Cart/Cart';

function App() {
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

  return (
    <div>
      {cartIsShown && (
        <Cart
          items={items}
          onClose={hideCartHandler}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          total={getCartTotal}
        />
      )}
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
