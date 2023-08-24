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

const getShippingAddress = () => {
  try {
    const serializedState = localStorage.getItem("shippingAddress");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveShippingAddress = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("shippingAddress", serializedState);
  } catch (err) {}
};

const deleteShippingAddress = () => {
  try {
    localStorage.removeItem("shippingAddress");
  } catch (e) {}
};

const getPaymentMethod = () => {
  try {
    const serializedState = localStorage.getItem("paymentMethod");
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
};

const savePaymentMethod = (state) => {
  try {
    localStorage.setItem("paymentMethod", state);
  } catch (err) {}
};

const deletePaymentMethod = () => {
  try {
    localStorage.removeItem("paymentMethod");
  } catch (e) {}
};

const CartlocalStorage = {
  getCartItems,
  saveCartItem,
  deleteCartItems,
  getShippingAddress,
  saveShippingAddress,
  deleteShippingAddress,
  getPaymentMethod,
  savePaymentMethod,
  deletePaymentMethod,
};
export default CartlocalStorage;
