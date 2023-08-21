import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  addToCartError,
  addToCartSucess,
  deleteCartError,
  deleteCartSucess,
} from "../actions/cartActions";
import {
  ADD_CART_START,
  DELETE_CART_START,
} from "../action-types/cartActionTypes";
import ProductService from "../services/product.service";
import { toast } from "react-toastify";

function* onAddToCartsStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_To_Cart", payload);
    const { slug, cart } = payload;

    const response = yield call(ProductService.getBySlug, slug);
    console.log("Call_Saga_Get_ProductBySlug", payload);
    if (response.status === "success") {
      const product = response.product;
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;

      //Check if product out of stock
      if (product.countInStock < quantity && product.countInStock === 0) {
        yield put(addToCartError("Sorry. Product is out of stock!"));
        toast.error("Sorry. Product is out of stock!");
      } else {
        yield put(addToCartSucess({ ...product, quantity }));
      }
    } else {
      yield put(addToCartError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(addToCartError(error.response));
  }
}

function* deleteCartStartAsync({ payload }) {
  try {
    console.log("Call_Saga_delete_Cart_Start", payload);
    yield put(deleteCartSucess(payload));
  } catch (error) {
    yield put(deleteCartError(error.response));
  }
}

export function* onAddToCarts() {
  yield takeLatest(ADD_CART_START, onAddToCartsStartAsync);
}

export function* deleteCart() {
  yield takeLatest(DELETE_CART_START, deleteCartStartAsync);
}

const cartSagas = [fork(onAddToCarts), fork(deleteCart)];

export default function* cartSaga() {
  yield all([...cartSagas]);
}
