const getCartItems = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveCartItem = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartItems", serializedState);
  } catch (err) {}
};

const deleteCartItems = () => {
  try {
    localStorage.removeItem("cartItems");
  } catch (e) {}
};

const CartlocalStorage = {
  getCartItems,
  saveCartItem,
  deleteCartItems,
};
export default CartlocalStorage;
