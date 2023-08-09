import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCT_BY_SLUG_FAILURE,
  LOAD_PRODUCT_BY_SLUG_REQUEST,
  LOAD_PRODUCT_BY_SLUG_SUCCESS,
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

export const loadProductBySlugRequest = (slug) => ({
  type: LOAD_PRODUCT_BY_SLUG_REQUEST,
  payload: slug,
});

export const loadProductBySlugSucess = (data) => ({
  type: LOAD_PRODUCT_BY_SLUG_SUCCESS,
  payload: data,
});

export const loadProductBySlugFail = (error) => ({
  type: LOAD_PRODUCT_BY_SLUG_FAILURE,
  payload: error,
});
