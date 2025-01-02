export const addToCart = (dispatch, item, quantity = 1) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: { ...item, quantity },
  });
};

export const updateCartQuantity = (dispatch, id, modifiers, quantity) => {
  dispatch({
    type: "UPDATE_CART_QUANTITY",
    payload: { id, modifiers, quantity },
  });
};

export const removeFromCart = (dispatch, id, modifiers) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: { id, modifiers },
  });
};

export const clearCart = (dispatch) => {
  dispatch({
    type: "CLEAR_CART",
  });
};
