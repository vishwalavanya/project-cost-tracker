// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';

// Import reducers from slices
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';
import otherCostsReducer from '../features/otherCosts/otherCostsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,          // Manages user login state
    items: itemsReducer,        // Manages project items (name + cost)
    otherCosts: otherCostsReducer, // Manages additional costs (shipping, tax)
  },
});
