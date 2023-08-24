import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
  LOAD_ORDER_BY_ID_ERROR,
  LOAD_ORDER_BY_ID_START,
  LOAD_ORDER_BY_ID_SUCCESS,
} from "../action-types/orderActionTypes";

export const addOrderStart = (order) => ({
  type: ADD_ORDER_START,
  payload: order,
});

export const addOrderSucess = (data) => ({
  type: ADD_ORDER_SUCCESS,
  payload: data,
});

export const addOrderError = (error) => ({
  type: ADD_ORDER_ERROR,
  payload: error,
});

export const loadOrderByIdStart = (orderID) => ({
  type: LOAD_ORDER_BY_ID_START,
  payload: orderID,
});

export const loadOrderByIdSucess = (data) => ({
  type: LOAD_ORDER_BY_ID_SUCCESS,
  payload: data,
});

export const loadOrderByIdError = (error) => ({
  type: LOAD_ORDER_BY_ID_ERROR,
  payload: error,
});
