import {
  ADD_CART_START,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR,
  DELETE_CART_START,
  DELETE_CART_SUCCESS,
  DELETE_CART_ERROR,
  UPDATE_CART_START,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
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

export const deleteCartStart = (data) => ({
  type: DELETE_CART_START,
  payload: data,
});

export const deleteCartSucess = (data) => ({
  type: DELETE_CART_SUCCESS,
  payload: data,
});

export const deleteCartError = (error) => ({
  type: DELETE_CART_ERROR,
  payload: error,
});

export const updateCartStart = (data) => ({
  type: UPDATE_CART_START,
  payload: data,
});

export const updateCartSucess = (data) => ({
  type: UPDATE_CART_SUCCESS,
  payload: data,
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  payload: error,
});
