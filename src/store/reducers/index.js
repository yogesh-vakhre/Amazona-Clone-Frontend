import { combineReducers } from "redux";

// reducer import
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

// ==============================|| COMBINE REDUCER ||============================== //

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
});
