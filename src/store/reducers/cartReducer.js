import {
  ADD_CART_ERROR,
  ADD_CART_START,
  ADD_CART_SUCCESS,
} from "../action-types/cartActionTypes";
import CartlocalStorage from "../localStorage/cart.localStorage";

const initialState = {
  cart: {
    cartItems: CartlocalStorage.getCartItems() ?? [],
  },
  error: "",
  loader: false,
  success: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_START:
      return { ...state, slug: action.payload, loader: true };
    case ADD_CART_SUCCESS:
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      CartlocalStorage.saveCartItem(cartItems);
      return { ...state, cart: { ...state.cart, cartItems } };
    case ADD_CART_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        loader: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
