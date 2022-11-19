import { useDispatch } from 'react-redux';
import {
  addToCartAction,
  removeFromCartAction,
  emptyCartAction,
} from '../../modules/cart';

const useCart = () => {
  const dispatch = useDispatch();

  const addToCart = (item) => {
    return dispatch(addToCartAction({ item }));
  };
  const removeFromCart = (id) => {
    dispatch(removeFromCartAction({ id }));
  };

  const emptyCart = () => {
    dispatch(emptyCartAction());
  };

  return { addToCart, removeFromCart, emptyCart };
};

export default useCart;
