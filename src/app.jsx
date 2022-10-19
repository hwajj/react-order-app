import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Items from './components/Menu/Items';
import Header from './components/UI/Header';
import { addToCart, removeFromCart, getCartTotal } from './modules/cart';
import ItemsContainer from './containers/ItemsContainer';
import Cart from './components/Cart/Cart';
import jwt_decode from 'jwt-decode';

function App() {
  //구글 로그인
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token : ' + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }
  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });

    google.accounts.id.prompt();
  }, []);

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

  return (
    <div>
      {cartIsShown && (
        <Cart
          items={items}
          onClose={hideCartHandler}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          total={getCartTotal}
          userName={user.name}
        />
      )}
      <div id='signInDiv' />
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>로그아웃</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt='' srcset='' />
          <h3>{user.name}</h3>
        </div>
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
