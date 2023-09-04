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
import { getError } from "../../utils/getError";
import { toast } from "react-toastify";

function* onLoadProductsRequestAsync() {
  try {
    const response = yield call(ProductService.getProducts);
    console.log("Call_Saga_Get_Product", response);
    if (response?.data?.status === "success") {
      yield put(loadProductsSucess(response.data));
    } else {
      yield put(loadProductsFail("Something Went Wrong, Please Try Again!"));
    }
  } catch (error) {
    yield put(loadProductsFail(getError(error)));
    toast.error(getError(error));
  }
}

function* onLoadProductBySlugRequestAsync({ payload }) {
  try {
    const response = yield call(ProductService.getProductBySlug, payload);
    console.log("Call_Saga_Get_Product_BY_Slug", payload);
    if (response?.data?.status === "success") {
      yield put(loadProductBySlugSucess(response.data));
    } else {
      yield put(
        loadProductBySlugFail("Something Went Wrong, Please Try Again!")
      );
    }
  } catch (error) {
    yield put(loadProductsFail(getError(error)));
    toast.error(getError(error));
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
