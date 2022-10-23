import React from 'react';
import { useContext, useState, useEffect } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;
  return (
    <div className={classes.cartBtnContainer}>
      <button className={classes.btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.badge}>{}</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
