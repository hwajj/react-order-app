import React from 'react';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../modules/cart';
import Items from '../components/Menu/Items';

const ItemsContainer = (props) => {
  //  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const onIncrease = useCallback(
    (item) => {
      console.log(item);
      return dispatch(addToCart(item));
    },
    [dispatch]
  );
  // const onDecrease = useCallback(
  //   (id) => dispatch(removeFromCart(id)),
  //   [dispatch]
  // );

  return <Items onIncrease={onIncrease} />;
};

export default ItemsContainer;
