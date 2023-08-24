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
  ADD_SHIPPING_ADDRESS_ERROR,
  ADD_SHIPPING_ADDRESS_START,
  ADD_SHIPPING_ADDRESS_SUCCESS,
  ADD_PAYMENT_METHOD_START,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_ERROR,
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

export const addShippingAddressStart = (shippingAddress) => ({
  type: ADD_SHIPPING_ADDRESS_START,
  payload: shippingAddress,
});

export const addShippingAddressSucess = (data) => ({
  type: ADD_SHIPPING_ADDRESS_SUCCESS,
  payload: data,
});

export const addShippingAddressError = (error) => ({
  type: ADD_SHIPPING_ADDRESS_ERROR,
  payload: error,
});

export const addPaymentMethodStart = (data) => ({
  type: ADD_PAYMENT_METHOD_START,
  payload: data,
});

export const addPaymentMethodSucess = (data) => ({
  type: ADD_PAYMENT_METHOD_SUCCESS,
  payload: data,
});

export const addPaymentMethodError = (error) => ({
  type: ADD_PAYMENT_METHOD_ERROR,
  payload: error,
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
