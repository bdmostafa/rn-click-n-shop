export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmountOfCart) => {
  return { type: ADD_ORDER, orderData: { cartItems, totalAmountOfCart } };
};
