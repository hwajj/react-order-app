import React from 'react';

import classes from './OrderList.module.css';

const OrderListButton = ({ onShowOrderList, onLoadOrderList }) => {
  const orderListHandler = () => {
    onShowOrderList();
    onLoadOrderList();
  };
  return (
    <div className={classes.orderList}>
      <button className={classes.button} onClick={orderListHandler}>
        주문목록
      </button>
    </div>
  );
};
export default OrderListButton;
