import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favorateSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});