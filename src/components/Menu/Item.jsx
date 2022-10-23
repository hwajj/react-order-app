import React from 'react';
import classes from './Item.module.css';
import { useRef, useState } from 'react';

const Item = ({ name, price, menu, onIncrease, onDecrease }) => {
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const onIncreaseHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    console.log(enteredAmount);
    onIncrease({
      id: menu.id,
      name: menu.name,
      amount: +enteredAmount,
      price: menu.price,
    });
  };
  return (
    <li className={classes.content}>
      <div className={classes.photo}>
        <img src={menu.img} alt={menu.description} />
      </div>

      <div className={classes.overlay}>
        <h3 className={classes.description}>{menu.description}</h3>
        <h3 className={classes.price}>{menu.price}</h3>

        <form onSubmit={submitHandler}>
          <div className={classes.itemInfo}>
            <input
              className={classes.input}
              type='number'
              min='1'
              max='5'
              step='1'
              defaultValue='1'
              ref={amountInputRef}
            ></input>
            <button onClick={onIncreaseHandler}> Add</button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default Item;
