import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // { itemId: { info, quantity } }
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload; // full item object
      const id = item?.id;

      if (!id) return;

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { info: item, quantity: 1 };
      }
    },

    removeItem: (state, action) => {
      const id = action.payload;

      if (!state.items[id]) return;

      state.items[id].quantity -= 1;

      if (state.items[id].quantity <= 0) {
        delete state.items[id];
      }
    },

    clearCart: (state) => {
      state.items = {};
    },
    setCart: (state, action) => {
      return { ...state, items: action.payload };
    },    
  },
});

export const { addItem, removeItem, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;






















