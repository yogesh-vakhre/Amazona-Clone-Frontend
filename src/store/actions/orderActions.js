import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
  LOAD_ORDER_BY_ID_ERROR,
  LOAD_ORDER_BY_ID_START,
  LOAD_ORDER_BY_ID_SUCCESS,
  PAY_ORDER_BY_ID_ERROR,
  PAY_ORDER_BY_ID_START,
  PAY_ORDER_BY_ID_SUCCESS,
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

export const loadOrderByIdStart = (orderId) => ({
  type: LOAD_ORDER_BY_ID_START,
  payload: orderId,
});

export const loadOrderByIdSucess = (data) => ({
  type: LOAD_ORDER_BY_ID_SUCCESS,
  payload: data,
});

export const loadOrderByIdError = (error) => ({
  type: LOAD_ORDER_BY_ID_ERROR,
  payload: error,
});

export const payOrderByIdStart = (orderId) => ({
  type: PAY_ORDER_BY_ID_START,
  payload: orderId,
});

export const payOrderByIdSucess = (data) => ({
  type: PAY_ORDER_BY_ID_SUCCESS,
  payload: data,
});

export const payOrderByIdError = (error) => ({
  type: PAY_ORDER_BY_ID_ERROR,
  payload: error,
});
