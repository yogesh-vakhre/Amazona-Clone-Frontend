import { combineReducers } from "redux";

// reducer import
import productReducer from "./productReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export default combineReducers({
  product: productReducer,
});
