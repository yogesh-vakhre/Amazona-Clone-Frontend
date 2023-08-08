import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
} from "../action-types/productActionTypes";

export const loadProductsRequest = () => ({
  type: LOAD_PRODUCTS_REQUEST,
});

export const loadProductsSucess = (data) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: data,
});

export const loadProductsFail = (error) => ({
  type: LOAD_PRODUCTS_FAILURE,
  payload: error,
});
