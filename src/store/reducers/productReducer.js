import {
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
} from "../action-types/productActionTypes";

const initialState = {
  total: 0,
  products: [],
  error: "",
  loader: false,
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return { ...state };

    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        total: action.payload.total,
        products: action.payload.products,
        success: true,
      };

    case LOAD_PRODUCTS_FAILURE:
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
