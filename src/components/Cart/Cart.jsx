import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import Item from '../Menu/Item';
import CartItem from './CartItem';

const Cart = ({ items, onClose, onIncrease, onDecrease, total }) => {
  console.log(total(items));
  const cartItemRemoveHandler = (id) => {
    onDecrease(id);
  };

  const cartItemAddHandler = (item) => {
    const newItem = Object.assign({}, item);
    newItem.amount = 1;
    onIncrease(newItem);
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
  const cartModalContent = (
    <div className={classes.content}>
      <div className={classes.title}> 주 문 서 </div>
      {cartItems}

      <div className={classes.sum}> 합계</div>
      {total(items)}
    </div>
  );

  return <Modal onClose={onClose}>{cartModalContent}</Modal>;
};

export default Cart;
