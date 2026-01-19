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
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;























// import { createSlice } from "@reduxjs/toolkit";


// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         items: [],
//     },
//     reducers: {
//         addItem: (state, action) => {
//             //mutating/modifying state
//             state.items.push(action.payload);
//         },
//         removeItem: (state) => {
//             state.items.pop();
//         },
//         clearCart: (state) => {
//             state.items = [];
//         },
//      },

// });

// export const {addItem, removeItem, clearCart} = cartSlice.actions;


// export default cartSlice.reducer;

