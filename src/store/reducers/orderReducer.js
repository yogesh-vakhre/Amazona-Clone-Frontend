import {
  ADD_ORDER_ERROR,
  ADD_ORDER_START,
  ADD_ORDER_SUCCESS,
  DELIVER_ORDER_BY_ID_ERROR,
  DELIVER_ORDER_BY_ID_START,
  DELIVER_ORDER_BY_ID_SUCCESS,
  LOAD_ORDER_BY_ID_ERROR,
  LOAD_ORDER_BY_ID_START,
  LOAD_ORDER_BY_ID_SUCCESS,
  PAY_ORDER_BY_ID_ERROR,
  PAY_ORDER_BY_ID_START,
  PAY_ORDER_BY_ID_SUCCESS,
} from "../action-types/orderActionTypes";

const initialState = {
  order: {},
  error: "",
  success: false,
  loader: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_START:
    case LOAD_ORDER_BY_ID_START:
    case PAY_ORDER_BY_ID_START:
    case DELIVER_ORDER_BY_ID_START:
      return { ...state, order: action.payload, loader: true };

    case ADD_ORDER_SUCCESS:
    case LOAD_ORDER_BY_ID_SUCCESS:
    case PAY_ORDER_BY_ID_SUCCESS:
    case DELIVER_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        success: true,
        loader: false,
      };

    case ADD_ORDER_ERROR:
    case LOAD_ORDER_BY_ID_ERROR:
    case PAY_ORDER_BY_ID_ERROR:
    case DELIVER_ORDER_BY_ID_ERROR:
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
