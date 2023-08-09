import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  loadProductBySlugFail,
  loadProductBySlugSucess,
  loadProductsFail,
  loadProductsSucess,
} from "../actions/productActions";
import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCT_BY_SLUG_REQUEST,
} from "../action-types/productActionTypes";
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

function* onLoadProductBySlugRequestAsync({ payload }) {
  try {
    const response = yield call(ProductService.getBySlug, payload);
    console.log("Call_Saga_Get_Product_BY_Slug", payload);
    if (response.status === "success") {
      yield put(loadProductBySlugSucess(response));
    } else {
      yield put(
        loadProductBySlugFail("Something Went Wrong, Please Try Again!")
      );
    }
  } catch (error) {
    yield put(loadProductsFail(error.response));
  }
}

export function* onLoadProducts() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, onLoadProductsRequestAsync);
}

export function* onLoadProductBySlug() {
  yield takeLatest(
    LOAD_PRODUCT_BY_SLUG_REQUEST,
    onLoadProductBySlugRequestAsync
  );
}
const productSagas = [fork(onLoadProducts), fork(onLoadProductBySlug)];

export default function* productSaga() {
  yield all([...productSagas]);
}
