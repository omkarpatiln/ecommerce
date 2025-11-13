import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Screen/Home/HomeInterface';
import { RootState } from './store';

interface ProductsState {
  data: Product[];
}

const initialState: ProductsState = {
  data: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.data = action.payload.map(item => ({
        ...item,
        cartCount: item.cartCount ?? 0,
      }));
    },

    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const index = state.data.findIndex(p => p.id === product.id);

      if (index !== -1) {
        state.data[index].cartCount = (state.data[index].cartCount ?? 0) + 1;
      } else {
        state.data.push({
          ...product,
          cartCount: 1,
        });
      }
    },

    removeProduct(state, action: PayloadAction<number>) {
      const productId = action.payload;

      const index = state.data.findIndex(p => p.id === productId);

      if (index !== -1) {
        const product = state.data[index];

        if ((product.cartCount ?? 0) > 1) {
          product.cartCount = (product.cartCount ?? 0) - 1;
        } else {
          product.cartCount = 0;
        }
      }
    },

    clearProductFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const index = state.data.findIndex(p => p.id === productId);

      if (index !== -1) {
        state.data[index].cartCount = 0;
      }
    },
  },
});

export const { setProducts, addProduct, removeProduct, clearProductFromCart } =
  productsSlice.actions;
export default productsSlice.reducer;

export const selectCartTotalCount = (state: RootState) =>
  state.products.data.reduce((total, item) => total + (item.cartCount ?? 0), 0);
