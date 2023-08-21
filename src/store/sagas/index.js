import { all } from "redux-saga/effects";
import productSaga from "./productSaga";
import cartSaga from "./cartSaga";

export default function* rootSaga() {
  yield all([productSaga(), cartSaga()]);
}
