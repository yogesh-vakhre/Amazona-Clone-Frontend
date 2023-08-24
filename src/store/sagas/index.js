import { all } from "redux-saga/effects";
import productSaga from "./productSaga";
import cartSaga from "./cartSaga";
import authSaga from "./authSaga";
import orderSaga from "./orderSaga";

export default function* rootSaga() {
  yield all([productSaga(), cartSaga(), authSaga(), orderSaga()]);
}
