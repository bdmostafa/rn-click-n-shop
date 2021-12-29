export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
    // console.log("actions here...", product)
  return { type: ADD_TO_CART, product: product };
};
