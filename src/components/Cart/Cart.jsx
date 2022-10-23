import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import Item from '../Menu/Item';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ items, onClose, onIncrease, onDecrease, total, user }) => {
  console.log(user);
  console.log(items);
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const rdxAddress = useSelector((state) => state.login.user.address);

  console.log(total(items));
  //주문서 아이템 -1
  const cartItemRemoveHandler = (id) => {
    onDecrease(id);
  };
  //주문서 아이템 +1
  const cartItemAddHandler = (item) => {
    const newItem = Object.assign({}, item);
    newItem.amount = 1;
    onIncrease(newItem);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setUserAddress(userAddress);
    const today = new Date();
    const msg = await fetch(
      process.env.REACT_APP_FIREBASE + `/${user.uid}.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          addressInfo: userData,
          orderedItems: items,
          date: today,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {console.log(didSubmit)}
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          didSubmit={didSubmit}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <div className={classes.cartContent}>
      <div className={classes.title}> 주 문 서 </div>
      {cartItems}

      <div className={classes.sum}>
        <div> 합계 : {total(items)}원 </div>
      </div>
      {/* <button onClick={orderBtnToggleHandler}> 결제 </button> */}
    </div>
  );

  const orderModalContent = (
    <div className={classes.checkoutContent}>
      <Checkout user={user} onConfirm={submitOrderHandler} onCancel={onClose} />
    </div>
  );
  console.log(items);
  console.log(userAddress);
  const didSubmitModalContent = (
    <>
      <p>주문완료</p>
      <div>{rdxAddress}</div>
      <div>{cartItems}</div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      <div className={classes.content}>
        {!didSubmit && cartModalContent}
        {items.length == 0 && (
          <div style={{ color: 'red', fontSize: '2rem', margin: '20px' }}>
            장바구니가 비어있습니다
          </div>
        )}
        {!didSubmit && items.length > 0 && orderModalContent}
        {didSubmit && didSubmitModalContent}
      </div>
    </Modal>
  );
};

export default Cart;
