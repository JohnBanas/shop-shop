import { configureStore } from '@reduxjs/toolkit';
import  {productReducer}  from './reducers';

console.log(productReducer);

export const store = configureStore({
  reducer: {
    product: productReducer
    } 
});

console.log(store);




