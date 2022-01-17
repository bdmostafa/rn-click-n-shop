import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";

export const addOrder = (cartItems, totalAmountOfCart) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    const date = new Date().toISOString();

    const response = await fetch(
      `https://rn-click-n-shop-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmountOfCart,
          date,
        }),
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        cartItems,
        totalAmountOfCart,
        date,
      },
    });
  };
};

export const getOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://rn-click-n-shop-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedOrders = [];

      for (const key in resData) {
        const { cartItems, totalAmountOfCart, date } = resData[key];

        loadedOrders.push(
          new Order(key, cartItems, totalAmountOfCart, new Date(date))
        );
      }

      dispatch({
        type: GET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};
