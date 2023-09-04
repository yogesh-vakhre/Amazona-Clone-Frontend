import { takeLatest, put, all, fork, call } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
  addOrderError,
  addOrderSucess,
  deliverOrderByIdError,
  deliverOrderByIdSucess,
  loadOrderByIdError,
  loadOrderByIdSucess,
  loadOrdersError,
  loadOrdersSucess,
  payOrderByIdError,
  payOrderByIdSucess,
} from "../actions/orderActions";
import OrderService from "../services/order.service";
import {
  ADD_ORDER_START,
  DELIVER_ORDER_BY_ID_START,
  LOAD_ORDERS_START,
  LOAD_ORDER_BY_ID_START,
  PAY_ORDER_BY_ID_START,
} from "../action-types/orderActionTypes";
import { getError } from "../../utils/getError";

function* onLoadOrdersStartAsync() {
  try {
    const response = yield call(OrderService.getOrders);
    console.log("Call_Saga_Orders_Response", response);

    if (response?.data?.status === "success") {
      yield put(loadOrdersSucess(response.data));
    } else {
      yield put(loadOrdersError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(loadOrdersError(getError(error)));
    toast.error(getError(error));
  }
}

function* onAddOrderStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_Order_Payload", payload);
    const response = yield call(OrderService.createOrder, payload);
    console.log("Call_Saga_Add_Order_Response", response);

    if (response?.data?.status === "success") {
      yield put(addOrderSucess(response.data));
      toast.success("Order is created successfully!");
    } else {
      yield put(addOrderError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(addOrderError(getError(error)));
    toast.error(getError(error));
  }
}

function* onLoadOrderByIdStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Order_BY_ID_Payload", payload);
    const response = yield call(OrderService.findOrderById, payload);
    console.log("Call_Saga_Order_BY_ID_Response", response);

    if (response?.data?.status === "success") {
      yield put(loadOrderByIdSucess(response.data));
    } else {
      yield put(loadOrderByIdError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(loadOrderByIdError(getError(error)));
    toast.error(getError(error));
  }
}

function* onPayOrderByIdStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Pay_Order_BY_ID_Payload", payload);
    const response = yield call(OrderService.payOrderById, payload);
    console.log("Call_Saga_Pay_Order_BY_ID_Response", response);

    if (response?.data?.status === "success") {
      yield put(payOrderByIdSucess(response.data));
      toast.success("Order is paid");
    } else {
      yield put(payOrderByIdError("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(payOrderByIdError(getError(error)));
    toast.error(getError(error));
  }
}

function* onDeliverOrderByIdStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Deliver_Order_BY_ID_Payload", payload);
    const response = yield call(OrderService.deliverOrderById, payload);
    console.log("Call_Saga_Deliver_Order_BY_ID_Response", response);

    if (response?.data?.status === "success") {
      yield put(deliverOrderByIdSucess(response.data));
      toast.success("Order is delivered");
    } else {
      yield put(
        deliverOrderByIdError("Something Went Wrong, Please Try Again!")
      );
    }
  } catch (error) {
    yield put(deliverOrderByIdError(getError(error)));
    toast.error(getError(error));
  }
}

export function* onLoadOrdersStart() {
  yield takeLatest(LOAD_ORDERS_START, onLoadOrdersStartAsync);
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

export function* onDeliverOrderByIdStart() {
  yield takeLatest(DELIVER_ORDER_BY_ID_START, onDeliverOrderByIdStartAsync);
}

const orderSagas = [
  fork(onLoadOrdersStart),
  fork(onAddOrderStart),
  fork(onLoadOrderByIdStart),
  fork(onPayOrderByIdStart),
  fork(onDeliverOrderByIdStart),
];

export default function* orderSaga() {
  yield all([...orderSagas]);
}
