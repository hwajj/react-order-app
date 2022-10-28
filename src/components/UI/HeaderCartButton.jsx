import React from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
  return (
    <div className={classes.cartBtnContainer}>
      <button onClick={props.onShowCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.badge}>{}</span>
      </button>
    </div>
  );
};

export default React.memo(HeaderCartButton);
