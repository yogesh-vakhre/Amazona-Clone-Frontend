import { combineReducers } from "redux";

// reducer import
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
});
