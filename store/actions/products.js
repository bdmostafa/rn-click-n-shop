import Product from "../../models/product";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        "https://rn-click-n-shop-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        const { ownerId, title, imageUrl, description, price } = resData[key];

        loadedProducts.push(
          new Product(key, ownerId, title, imageUrl, description, price)
        );
      }

      dispatch({
        type: GET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    const response = await fetch(
      `https://rn-click-n-shop-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    if (!response.ok) {
      const errMessage = await response.json();
      throw new Error(errMessage.error);
    }

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        ownerId: userId,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://rn-click-n-shop-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      const errMessage = await response.json();
      throw new Error(errMessage.error);
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://rn-click-n-shop-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errMessage = await response.json();
      throw new Error(errMessage.error);
    }

    dispatch({ type: DELETE_PRODUCT, productId });
  };
};
