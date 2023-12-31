import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
  DELIVER_ORDER_BY_ID_ERROR,
  DELIVER_ORDER_BY_ID_START,
  DELIVER_ORDER_BY_ID_SUCCESS,
  LOAD_ORDERS_ERROR,
  LOAD_ORDERS_START,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDER_BY_ID_ERROR,
  LOAD_ORDER_BY_ID_START,
  LOAD_ORDER_BY_ID_SUCCESS,
  PAY_ORDER_BY_ID_ERROR,
  PAY_ORDER_BY_ID_START,
  PAY_ORDER_BY_ID_SUCCESS,
} from "../action-types/orderActionTypes";

export const loadOrdersStart = () => ({
  type: LOAD_ORDERS_START,
});

export const loadOrdersSucess = (data) => ({
  type: LOAD_ORDERS_SUCCESS,
  payload: data,
});

export const loadOrdersError = (error) => ({
  type: LOAD_ORDERS_ERROR,
  payload: error,
});

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

export const deliverOrderByIdStart = (orderId) => ({
  type: DELIVER_ORDER_BY_ID_START,
  payload: orderId,
});

export const deliverOrderByIdSucess = (data) => ({
  type: DELIVER_ORDER_BY_ID_SUCCESS,
  payload: data,
});

export const deliverOrderByIdError = (error) => ({
  type: DELIVER_ORDER_BY_ID_ERROR,
  payload: error,
});
