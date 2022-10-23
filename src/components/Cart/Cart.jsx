import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ items, onClose, onIncrease, onDecrease, total, user }) => {
  // const [order, setOrder] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const rdxAddress = useSelector((state) => state.login.user.address);

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
    // setIsSubmitting(true);
    setUserAddress(userAddress);
    const today = new Date();
    await fetch(process.env.REACT_APP_FIREBASE + `/${user.uid}.json`, {
      method: 'POST',
      body: JSON.stringify({
        addressInfo: userData,
        orderedItems: items,
        date: today,
      }),
    });

    // setIsSubmitting(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
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
  const didSubmitModalContent = (
    <div className={classes.orderComplete}>
      <p>주문완료</p>

      <div>{cartItems}</div>
      <hr />
      <div className={classes.price}> {total(items)}원 </div>
      <div className={classes.address}> {rdxAddress}</div>
      <div className={classes.message}> 감사합니다 ! </div>
      <div>
        <button className={classes.button} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClose={onClose}>
      <div className={classes.content}>
        {!didSubmit && cartModalContent}
        {items.length === 0 && (
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
