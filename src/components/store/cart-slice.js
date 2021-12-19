import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  cartState: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const payloadItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === payloadItem.id
      );
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === payloadItem.id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: payloadItem.id,
          price: payloadItem.price,
          quantity: 1,
          totalPrice: payloadItem.price,
          title: payloadItem.title,
        });
      } else {
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].totalPrice =
          existingItem.totalPrice + payloadItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// action thunk
// not a reducer
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-fetch-movies-12638-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Sending data failed!",
          })
        );
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      console.log(error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
