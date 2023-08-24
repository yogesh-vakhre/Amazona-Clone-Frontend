import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
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
