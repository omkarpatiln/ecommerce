import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
