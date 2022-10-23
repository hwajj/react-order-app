import React from 'react';
import classes from './CartItem.module.css';

const CartItem = ({ name, amount, price, onRemove, onAdd, didSubmit }) => {
  console.log(didSubmit);
  return (
    <li className={classes['cart-item']}>
      <div className={classes.summary}>
        <h2>{name}</h2>
        <span className={classes.price}>{price}원</span>
      </div>

      <div style={{ width: '21%' }} className={classes.actions}>
        {!didSubmit && <button onClick={onRemove}>−</button>}
        <span className={classes.amount}>{amount}</span>
        {!didSubmit && <button onClick={onAdd}>+</button>}
      </div>
    </li>
  );
};
export default CartItem;
