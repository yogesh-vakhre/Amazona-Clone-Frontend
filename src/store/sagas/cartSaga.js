import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import {
  addToCartError,
  addToCartSucess,
  deleteCartError,
  deleteCartSucess,
  updateCartError,
  updateCartSucess,
  addShippingAddressError,
  addShippingAddressSucess,
  addPaymentMethodSucess,
  addPaymentMethodError,
} from "../actions/cartActions";
import {
  ADD_CART_START,
  DELETE_CART_START,
  UPDATE_CART_START,
  ADD_SHIPPING_ADDRESS_START,
  ADD_PAYMENT_METHOD_START,
} from "../action-types/cartActionTypes";

import ProductService from "../services/product.service";
import { toast } from "react-toastify";
import CartlocalStorage from "../localStorage/cart.localStorage";
import { getError } from "../../utils/getError";

function* onAddToCartsStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_To_Cart", payload);
    const { slug, cart } = payload;

    const response = yield call(ProductService.getProductBySlug, slug);
    console.log("Call_Saga_Get_ProductBySlug", response.data.product);
    if (response?.data?.status === "success") {
      const product = response?.data?.product;
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;

      //Check if product out of stock
      if (product.countInStock < quantity || product.countInStock === 0) {
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
    yield put(addToCartError(getError(error)));
    toast.error(getError(error));
  }
}

function* deleteCartStartAsync({ payload }) {
  try {
    console.log("Call_Saga_delete_Cart_Start", payload);
    yield put(deleteCartSucess(payload));
  } catch (error) {
    yield put(deleteCartError(getError(error)));
    toast.error(getError(error));
  }
}

function* updateCartStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Update_Cart_Start", payload);

    const { product, quantity } = payload;

    const response = yield call(ProductService.getProductBySlug, product.slug);
    console.log("Call_Saga_Get_ProductBySlug", response.data.product);
    if (response?.data?.status === "success") {
      //Check if product out of stock
      if (product.countInStock < quantity || product.countInStock === 0) {
        yield put(updateCartError("Sorry. Product is out of stock!"));
        toast.error("Sorry. Product is out of stock!");
      } else {
        yield put(updateCartSucess({ ...product, quantity }));
      }
    } else {
      yield put(updateCartError("Something Went Wrong, Please Try Again!"));
      toast.error("Something Went Wrong, Please Try Again!");
    }
  } catch (error) {
    yield put(updateCartError(getError(error)));
    toast.error(getError(error));
  }
}

function* onAddShippingAddressStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_ShippingAddress_Payload", payload);
    CartlocalStorage.saveShippingAddress(payload);
    yield put(addShippingAddressSucess(payload));
  } catch (error) {
    yield put(addShippingAddressError(getError(error)));
    toast.error(getError(error));
  }
}

function* onAddPaymentMethodStartAsync({ payload }) {
  try {
    console.log("Call_Saga_Add_PaymentMethod_Payload", payload);
    CartlocalStorage.savePaymentMethod(payload.paymentMethod);
    yield put(addPaymentMethodSucess(payload.paymentMethod));
  } catch (error) {
    yield put(addPaymentMethodError(getError(error)));
    toast.error(getError(error));
  }
}

export function* onAddToCarts() {
  yield takeLatest(ADD_CART_START, onAddToCartsStartAsync);
}

export function* deleteCart() {
  yield takeLatest(DELETE_CART_START, deleteCartStartAsync);
}

export function* updateCart() {
  yield takeLatest(UPDATE_CART_START, updateCartStartAsync);
}

export function* onAddShippingAddress() {
  yield takeLatest(ADD_SHIPPING_ADDRESS_START, onAddShippingAddressStartAsync);
}

export function* onAddPaymentMethod() {
  yield takeLatest(ADD_PAYMENT_METHOD_START, onAddPaymentMethodStartAsync);
}

const cartSagas = [
  fork(onAddToCarts),
  fork(deleteCart),
  fork(updateCart),
  fork(onAddShippingAddress),
  fork(onAddPaymentMethod),
];

export default function* cartSaga() {
  yield all([...cartSagas]);
}
