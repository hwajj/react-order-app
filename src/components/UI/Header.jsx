import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import Login from '../Login/Login';
import OrderListButton from '../OrderList/OrderListButton';

const Header = ({ onShowCart, onShowOrderList, onLoadOrderList, userInfo }) => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.login}>
          <Login />
        </div>
        <div className={classes.title}>
          <h1> 시스터즈&nbsp;</h1>
          <h1> 샌드위치&nbsp;</h1>
        </div>
        <div className={classes.buttonContainer}>
          {userInfo && Object.values(userInfo).length > 0 && (
            <OrderListButton
              onShowOrderList={onShowOrderList}
              onLoadOrderList={onLoadOrderList}
            />
          )}
          <HeaderCartButton onShowCart={onShowCart} />
        </div>
      </header>
    </>
  );
};
export default React.memo(Header);
