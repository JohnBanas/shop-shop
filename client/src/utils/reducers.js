import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    UPDATE_PRODUCTS: (state, action) => {
      console.log(state);
      console.log(action);
      state.products = action.products
    },
    UPDATE_CATEGORIES: (state, action) => {
      state.categories = action.categories
    },
    UPDATE_CURRENT_CATEGORY: (state, action) => {
      state.currentCategory = action.currentCategory
      console.log(action);
    },
    ADD_TO_CART: (state, action) => {
      state.cartOpen = true;
      state.cart = [...state.cart, action.product];
    },
    ADD_MULTIPLE_TO_CART: (state, action) => {
      state.cart = [...state.cart, ...action.products]
    },
    REMOVE_FROM_CART: (state, action) => {
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      })
      state.cartOpen = newState.length > 0;
      state.cart = newState;
    },
    UPDATE_CART_QUANTITY: (state, action) => {
      state.cartOpen = true;
      state.cart = state.cart.map(product => {
        if (action._id === product._id) {
          product.purchaseQuantity = action.purchaseQuantity;
        }
        return product;
      })
    },
    CLEAR_CART: (state) => {
      state.cartOpen = false
      state.cart = []
    },
    TOGGLE_CART: (state) => {
      state.cartOpen = !state.cartOpen
    }  
  },
});

export const {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} = productSlice.actions;

export const productReducer = productSlice.reducer

