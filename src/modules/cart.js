import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartStateSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartAction: (state, { payload }) => {
      const ItemIdx = state.items.findIndex((e) => e.id === payload.item.id);
      let updatedItemArr = [...state.items];
      if (ItemIdx >= 0) {
        const existingItem = state.items[ItemIdx];
        let maxAmount =
          Number(existingItem.amount) + Number(payload.item.amount);
        if (maxAmount > 20) maxAmount = 20;
        const upDatedItem = {
          ...existingItem,
          amount: maxAmount,
        };
        updatedItemArr[ItemIdx] = upDatedItem;
      } else {
        updatedItemArr = state.items.concat(payload.item);
      }
      return {
        ...state,
        items: [...updatedItemArr],
      };
    },

    removeFromCartAction: (state, { payload }) => {
      const removeItemIdx = state.items.findIndex((e) => e.id === payload.id);
      const existingItem_ = state.items[removeItemIdx];
      let newItems = [...state.items];

      const newAmount = existingItem_.amount - 1;
      const upDatedItem = {
        ...existingItem_,
        amount: newAmount,
      };

      newItems[removeItemIdx] = upDatedItem;
      if (newAmount === 0) {
        newItems.splice(removeItemIdx, 1);
      }

      return { ...state, items: [...newItems] };
    },
    emptyCartAction: (state) => {
      return { ...state, items: [] };
    },
  },
});

export const { addToCartAction, removeFromCartAction, emptyCartAction } =
  cartStateSlice.actions;

export default cartStateSlice.reducer;

//액션 생성
// const ADD_TO_CART = 'cart/ADD';
// const REMOVE_FROM_CART = 'cart/REMOVE';
// const EMPTY_CART = 'cart/EMPTY';

//액션생성함수
// export const addToCart = (item) => ({ type: ADD_TO_CART, item });
// export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, id });
// export const emptyCart = () => ({ type: EMPTY_CART });

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const ItemIdx = state.items.findIndex(
//         (item) => item.id === action.item.id
//       );
//       let updatedItemArr = [...state.items];
//       if (ItemIdx >= 0) {
//         const existingItem = state.items[ItemIdx];
//         let maxAmount =
//           Number(existingItem.amount) + Number(action.item.amount);
//         if (maxAmount > 20) maxAmount = 20;
//         const upDatedItem = {
//           ...existingItem,
//           amount: maxAmount,
//         };
//         updatedItemArr[ItemIdx] = upDatedItem;
//       } else {
//         updatedItemArr = state.items.concat(action.item);
//       }
//       return {
//         ...state,
//         items: [...updatedItemArr],
//       };
//     case REMOVE_FROM_CART:
//       const removeItemIdx = state.items.findIndex(
//         (item) => item.id === action.id
//       );
//       const existingItem_ = state.items[removeItemIdx];
//       let newItems = [...state.items];

//       const newAmount = existingItem_.amount - 1;
//       const upDatedItem = {
//         ...existingItem_,
//         amount: newAmount,
//       };

//       newItems[removeItemIdx] = upDatedItem;
//       if (newAmount === 0) {
//         newItems.splice(removeItemIdx, 1);
//       }

//       return { ...state, items: [...newItems] };
//     case EMPTY_CART:
//       return { ...state, items: [] };
//     default:
//       return state;
//   }
// };

//export default cartReducer;
