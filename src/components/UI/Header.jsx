import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import Login from '../Login/Login';
import OrderListButton from '../OrderList/OrderListButton';

const Header = ({ onShowCart, onShowOrderList, onLoadOrderList }) => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.login}>
          <Login />
        </div>

        <h1 className={classes.title}> 시스터즈 샌드위치</h1>
        <div className={classes.orderList}>
          <OrderListButton
            onShowOrderList={onShowOrderList}
            onLoadOrderList={onLoadOrderList}
          />
        </div>
        <div className={classes.button}>
          <HeaderCartButton onShowCart={onShowCart} />
        </div>
      </header>
    </>
  );
};
export default Header;
