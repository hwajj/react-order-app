import React, { useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import Item from '../Menu/Item';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ items, onClose, onIncrease, onDecrease, total, user }) => {
  console.log(user);

  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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
    await fetch(process.env.REACT_APP_FIREBASE + '/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: items,
      }),
    });
    setIsSubmitting(false);
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
        />
      ))}
    </ul>
  );
  const orderBtnToggleHandler = () => {
    setOrder(!order);
    console.log(order);
  };

  const cartModalContent = (
    <div className={classes.content}>
      <div className={classes.title}> 주 문 서 </div>
      {cartItems}

      <div className={classes.sum}> 합계</div>
      {total(items)}
      <button onClick={orderBtnToggleHandler}>주문</button>
    </div>
  );

  const orderModalContent = (
    <div className={classes.content}>
      <Checkout user={user} onConfirm={submitOrderHandler} onCancel={onClose} />
    </div>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully send the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      {!didSubmit && cartModalContent}
      {order && orderModalContent}
    </Modal>
  );
};

export default Cart;
