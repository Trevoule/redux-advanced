import { createSlice } from "@reduxjs/toolkit";

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

export const cartActions = cartSlice.actions;

export default cartSlice;
