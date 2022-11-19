export const getCartTotal = (items) => {
  return items?.reduce((sum, curr) => sum + curr.amount * curr.price, 0);
};
