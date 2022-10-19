//액션 생성
const ADD_TO_CART = 'cart/ADD';
const REMOVE_FROM_CART = 'cart/REMOVE';

//액션생성함수
export const addToCart = (item) => ({ type: ADD_TO_CART, item });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });

const initialState = {
  items: [],
};

export const getCartTotal = (items) => {
  return items?.reduce((sum, curr) => sum + curr.amount * curr.price, 0);
};

// export const getBasketMap = (cart) =>
//   cart?.reduce((array, item) => {
//     let x = array.find((e) => e.id === item.id);
//     //없으면 amount 1 로 줌
//     if (!x) {
//       item['amount'] = 1;
//       array = array.concat(item);

//       //있으면 amount 개수 증가
//     } else {
//       x['amount']++;
//     }

//     return array;
//   }, []);

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(action);
      //    return;
      const ItemIdx = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingItem = state.items[ItemIdx];
      let updatedItemArr = [...state.items];

      if (ItemIdx >= 0) {
        const upDatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItemArr[ItemIdx] = upDatedItem;
      } else {
        updatedItemArr = state.items.concat(action.item);
      }
      console.log(updatedItemArr);
      return {
        ...state,
        items: [...updatedItemArr],
      };
    case REMOVE_FROM_CART:
      const removeItemIdx = state.items.findIndex(
        (item) => item.id === action.id
      );

      let newItems = [...state.items];
      let newAmount = newItems[removeItemIdx].amount--;
      if (newAmount === 1) {
        newItems.splice(removeItemIdx, 1);
      }

      return { ...state, items: newItems };

    default:
      return state;
  }
};

export default cartReducer;
