import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
} from "../action-types/orderActionTypes";

const initialState = {
  total: 0,
  order: {},
  error: "",
  loader: false,
  success: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_START:
      return { ...state, order: action.payload, loader: true };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        success: true,
        loader: false,
      };

    case ADD_ORDER_ERROR:
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

export default orderReducer;
