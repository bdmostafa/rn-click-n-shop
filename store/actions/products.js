import Product from "../../models/product";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const getProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-click-n-shop-default-rtdb.firebaseio.com/products.json"
    );

    const resData = await response.json();
    const loadedProducts = [];

    for (const key in resData) {
      const { title, imageUrl, description, price } = resData[key];

      loadedProducts.push(
        new Product(key, "u1", title, imageUrl, description, price)
      );
    }

    dispatch({ type: GET_PRODUCTS, products: loadedProducts });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-click-n-shop-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, productId };
};
