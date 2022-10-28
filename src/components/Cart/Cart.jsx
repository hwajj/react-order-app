import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { emptyCart } from '../../modules/cart';

const Cart = ({ items, onClose, onIncrease, onDecrease, total, user }) => {
  // const [order, setOrder] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [didSubmit, setDidSubmit] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const rdxAddress = useSelector((state) => state.login.user?.address);
  const orderCompleteTitleRef = useRef();
  const orderTitleRef = useRef();
  const contentRef = useRef();
  const closeRef = useRef();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    contentScrollByTimeOut(orderCompleteTitleRef);
    contentScrollByTimeOut(closeRef, 1000);
    //setTimeout();
  }, [didSubmit]);

  const contentScrollByTimeOut = (dom, sec = 0) => {
    setTimeout(() => {
      dom.current?.scrollIntoView({ behavior: 'smooth' });
    }, sec);
  };

  //주문서 아이템 -1
  const cartItemRemoveHandler = (id) => {
    onDecrease(id);
  };
  //주문서 아이템 +1
  const cartItemAddHandler = (item) => {
    const newItem = Object.assign({}, item);
    newItem.amount = 1;
    onIncrease(newItem);
  };

  const submitOrderHandler = async (userData) => {
    // setIsSubmitting(true);
    setUserAddress(userAddress);
    const today = new Date();
    await fetch(process.env.REACT_APP_FIREBASE + `/${user.uid}.json`, {
      method: 'POST',
      body: JSON.stringify({
        addressInfo: userData,
        orderedItems: items,
        date: today,
      }),
    });

    setDidSubmit(true);
  };

  const onChangeValue = (item, event) => {
    const newItem = Object.assign({}, item);
    //   console.log(type event.target.value)
    const amount = Number(event.target.value);
    if (amount <= 20) {
      newItem.amount = event.target.value - item.amount;
    } else {
      newItem.amount = 20 - item.amount;
    }
    onIncrease(newItem);
  };

  const onCloseEmptyCart = () => {
    onClose();

    //결제시 장바구니 비우기
    didSubmit && dispatch(emptyCart());
  };

  const cartItems = (
    <>
      <ul className={classes['cart-items']}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            didSubmit={didSubmit}
            onChangeValue={onChangeValue.bind(null, item)}
          />
        ))}
      </ul>
    </>
  );

  const cartModalContent = (
    <div className={classes.cartContent} ref={orderTitleRef}>
      <div className={classes.title}> 주 문 서 </div>
      {!didSubmit && (
        <div className={classes.maxItemMsg}>
          품목 당 최대 20개 주문가능합니다
        </div>
      )}
      {cartItems}
      <hr />
      <div className={classes.sum}>
        <div> 합계 : {total(items)}원 </div>
      </div>
      {/* <button onClick={orderBtnToggleHandler}> 결제 </button> */}
    </div>
  );

  const orderModalContent = (
    <div className={classes.checkoutContent}>
      <Checkout
        onScroll={contentScrollByTimeOut}
        user={user}
        onConfirm={submitOrderHandler}
        onCancel={onClose}
      />
    </div>
  );
  const didSubmitModalContent = (
    <div className={classes.orderComplete} ref={orderCompleteTitleRef}>
      <p>주문완료</p>

      <div>{cartItems}</div>
      <hr />
      <div className={classes.price}> {total(items)}원 </div>
      <div className={classes.address}> {rdxAddress}</div>
      <div className={classes.message}> 감사합니다 ! </div>
      <div>
        <button
          className={classes.button}
          onClick={onCloseEmptyCart}
          ref={closeRef}
        >
          닫기
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClose={onCloseEmptyCart}>
      <div className={classes.content} ref={contentRef}>
        {!didSubmit && cartModalContent}
        {items.length === 0 && (
          <div style={{ color: 'red', fontSize: '2rem', margin: '20px' }}>
            장바구니가 비어있습니다
          </div>
        )}
        {!didSubmit && items.length > 0 && orderModalContent}
        {didSubmit && didSubmitModalContent}
      </div>
    </Modal>
  );
};

export default Cart;
