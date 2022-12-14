import React from 'react';
import classes from './OrderList.module.css';
import Modal from '../UI/Modal';

const OrderList = ({ onClose, orderedList }) => {
  let dateArr_ = Object.values(orderedList)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((e) => e.date);
  let dateArr = [];
  let dayArr = [];
  let timeArr = [];
  dateArr_.map((e) => dateArr.push(new Date(e)));
  dayArr = dateArr.map((e) => e.toLocaleString().substr(0, 13));
  timeArr = dateArr.map((e) => e.toLocaleString().substr(14));
  let addressArr = Object.values(orderedList)
    .map((e) => e.addressInfo)
    .map((e) => Object.values(e)[0]);

  let itemsArr = Object.values(orderedList)
    .map((e) => e.orderedItems)
    .map((e) =>
      e.map((e) => {
        return `${e.name} x ${e.amount} `;
      })
    );

  return (
    <Modal onClose={onClose}>
      {Object.entries(orderedList).length > 0 && (
        <div>
          <div className={classes.title}>주문목록</div>
          <div className={classes.contentContainer}>
            {itemsArr.map((e, i) => {
              return (
                <div key={i} className={classes.content}>
                  <div className={classes.number}>{i + 1}</div>
                  <div className={classes.date}>
                    <div>{dayArr[i]}</div>
                    <div>{timeArr[i]}</div>
                  </div>
                  <div className={classes.items}>
                    {e.map((innerElement, i) => (
                      <li key={i}>{innerElement}</li>
                    ))}
                  </div>
                  <div className={classes.address}>{addressArr[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default OrderList;
