// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Adjust the path if necessary

export const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;