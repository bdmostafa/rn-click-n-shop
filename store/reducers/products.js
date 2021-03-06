import { PRODUCTS } from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };

    case CREATE_PRODUCT:
      const {
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price,
      } = action.productData;

      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const userProductIdx = state.userProducts.findIndex(
        (product) => product.id === action.productId
      );

      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIdx].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIdx].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIdx] = updatedProduct;

      const availableProductIdx = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIdx] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };

    default:
      return state;
  }
};
