import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCT_BY_SLUG_FAILURE,
  LOAD_PRODUCT_BY_SLUG_REQUEST,
  LOAD_PRODUCT_BY_SLUG_SUCCESS,
} from "../action-types/productActionTypes";

const initialState = {
  total: 0,
  product: {},
  products: [],
  error: "",
  loader: false,
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return { ...state };
    case LOAD_PRODUCT_BY_SLUG_REQUEST:
      return { ...state, slug: action.payload };

    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        total: action.payload.total,
        products: action.payload.products,
        success: true,
      };

    case LOAD_PRODUCT_BY_SLUG_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
        success: true,
      };

    case LOAD_PRODUCTS_FAILURE:
    case LOAD_PRODUCT_BY_SLUG_FAILURE:
      return {
        ...state,
        error: action.payload,
        success: false,
        loader: true,
      };
    default:
      return { ...state };
  }
};

export default productReducer;
