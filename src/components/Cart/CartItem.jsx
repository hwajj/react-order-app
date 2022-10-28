import React from 'react';
import classes from './CartItem.module.css';

const CartItem = ({
  name,
  amount,
  price,
  onRemove,
  onAdd,
  didSubmit,
  onChangeValue,
}) => {
  return (
    <>
      <li className={classes['cart-item']}>
        <div className={classes.summary}>
          <h2>{name}</h2>
          <span className={classes.price}>{price}원</span>
        </div>

        <div className={classes.actions}>
          {!didSubmit && <button onClick={onRemove}>−</button>}
          {didSubmit && <div>x</div>}
          {didSubmit && <span className={classes.amount}>{amount}</span>}
          {!didSubmit && (
            <input
              max='20'
              min='1'
              type='number'
              onChange={(e) => onChangeValue(e)}
              value={amount}
            />
          )}

          {!didSubmit && <button onClick={onAdd}>+</button>}
        </div>
      </li>
    </>
  );
};
export default CartItem;
