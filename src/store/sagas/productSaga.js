import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  loadProductsFail,
  loadProductsSucess,
} from "../actions/productActions";
import { LOAD_PRODUCTS_REQUEST } from "../action-types/productActionTypes";
import ProductService from "../services/product.service";

function* onLoadProductsRequestAsync() {
  try {
    const response = yield call(ProductService.getAll);
    console.log("Call_Saga_Get_Product", response);
    if (response.status === "success") {
      yield put(loadProductsSucess(response));
    } else {
      yield put(loadProductsFail("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(loadProductsFail(error.response));
  }
}

export function* onLoadProducts() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, onLoadProductsRequestAsync);
}

const productSagas = [fork(onLoadProducts)];

export default function* productSaga() {
  yield all([...productSagas]);
}
