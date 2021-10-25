// Pass in Redux store's state to save it to the user's browser local storage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // We'll just ignore write errors
  }
};

// Loads the state and returns an object that can be provided as the
// preloadedState parameter of store.js's call to configureStore
export const loadState = () => {
  try {
    const cartItemsFromStorage = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {};
  } catch (error) {
    return undefined;
  }
};
