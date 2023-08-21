import {
  ADD_CART_START,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR,
} from "../action-types/cartActionTypes";

export const addToCartStart = (data) => ({
  type: ADD_CART_START,
  payload: data,
});

export const addToCartSucess = (data) => ({
  type: ADD_CART_SUCCESS,
  payload: data,
});

export const addToCartError = (error) => ({
  type: ADD_CART_ERROR,
  payload: error,
});
