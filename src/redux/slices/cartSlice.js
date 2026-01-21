import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cart_items";

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const existing = state.items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,                    
          name: product.title,
          price: product.price,
          image: product.images?.[0] ?? "",
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
        saveCart(state.items);
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveCart(state.items);
    },

    clearCart(state) {
      state.items = [];
      saveCart([]);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
