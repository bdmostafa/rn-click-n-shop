import Order from "../../models/order";
import { ADD_ORDER, GET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { id, cartItems, totalAmountOfCart, date } = action.orderData;

      const newOrder = new Order(id, cartItems, totalAmountOfCart, date);

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    default:
      return state;
  }
};
