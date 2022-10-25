import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../modules/cart';
import Items from '../components/Menu/Items';

const ItemsContainer = (props) => {
  //  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const onIncrease = useCallback(
    (item) => {
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
