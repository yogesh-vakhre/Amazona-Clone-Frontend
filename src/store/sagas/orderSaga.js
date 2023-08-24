import { takeLatest, put, all, fork, call } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
  addOrderError,
  addOrderSucess,
  loadOrderByIdError,
  loadOrderByIdSucess,
  payOrderByIdError,
  payOrderByIdSucess,
} from "../actions/orderActions";
import OrderService from "../services/order.service";
import {
  ADD_ORDER_START,
  LOAD_ORDER_BY_ID_START,
  PAY_ORDER_BY_ID_START,
} from "../action-types/orderActionTypes";

function* onAddOrderStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_Order_Start_Payload", payload);
    const response = yield call(OrderService.create, payload);
    console.log("Call_Saga_Add_Order_Start_Response", response);

    if (response?.status === "success") {
      yield put(addOrderSucess(response));
      toast.success("Order is created successfully!");
    } else {
      yield put(addOrderError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(addOrderError(error.response));
  }
}

function* onLoadOrderByIdStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Order_BY_ID_Start_Payload", payload);
    const response = yield call(OrderService.findById, payload);
    console.log("Call_Saga_Order_BY_ID_Start_Response", response);

    if (response?.status === "success") {
      yield put(loadOrderByIdSucess(response));
    } else {
      yield put(loadOrderByIdError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(loadOrderByIdError(error.response));
  }
}

function* onPayOrderByIdStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Pay_Order_BY_ID_Start_Payload", payload);
    const response = yield call(OrderService.payOrderById, payload);
    console.log("Call_Saga_Pay_Order_BY_ID_Start_Response", response);

    if (response?.status === "success") {
      yield put(payOrderByIdSucess(response));
      toast.success("Order is paid");
    } else {
      yield put(payOrderByIdError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(payOrderByIdError(error.response));
  }
}

export function* onAddOrderStart() {
  yield takeLatest(ADD_ORDER_START, onAddOrderStartAsync);
}

export function* onLoadOrderByIdStart() {
  yield takeLatest(LOAD_ORDER_BY_ID_START, onLoadOrderByIdStartAsync);
}

export function* onPayOrderByIdStart() {
  yield takeLatest(PAY_ORDER_BY_ID_START, onPayOrderByIdStartAsync);
}

const orderSagas = [
  fork(onAddOrderStart),
  fork(onLoadOrderByIdStart),
  fork(onPayOrderByIdStart),
];

export default function* orderSaga() {
  yield all([...orderSagas]);
}
