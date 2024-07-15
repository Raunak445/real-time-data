// redux/store.ts
'use client'


import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './features/stock/stockSlice';

const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
