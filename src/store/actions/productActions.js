import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
} from "../action-types/productActionTypes";
import ProductService from "../services/product.service";

export const loadProductsRequest = (token) => {
  return async (dispatch) => {
    try {
      const poductsGetResponse = await ProductService.getAll();
      if (poductsGetResponse?.status === "success") {
        dispatch(loadProductsSucess(poductsGetResponse));
      } else {
        dispatch(loadProductsFail("Something Went Wrong, Please Try Again!"));
      }
    } catch (error) {
      dispatch(loadProductsFail(error));
      // console.log(error);
    }
  };
};

export const loadProductsSucess = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOAD_PRODUCTS_SUCCESS,
      payload: data,
    });
  };
};
export const loadProductsFail = (error) => {
  return async (dispatch) => {
    dispatch({
      type: LOAD_PRODUCTS_FAILURE,
      payload: error,
    });
  };
};
