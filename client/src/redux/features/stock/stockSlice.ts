// redux/stockSlice.ts
'use client'


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  currentStock: string;
  stocks: { code: string; name: string }[];
  data: number[];
}

const initialState: StockState = {
  currentStock: '',
  stocks: [],
  data: [],
};

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('stockState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Helper function to save state to localStorage
const saveState = (state: StockState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('stockState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const stockSlice = createSlice({
  name: 'stock',
  initialState: loadState(),
  reducers: {
    setStocks(state, action: PayloadAction<{ code: string; name: string }[]>) {
      state.stocks = action.payload;
      saveState(state);
    },
    setCurrentStock(state, action: PayloadAction<string>) {
      state.currentStock = action.payload;
      saveState(state);
    },
    setStockData(state, action: PayloadAction<number[]>) {
      state.data = action.payload;
      saveState(state);
    },
  },
});

export const { setStocks, setCurrentStock, setStockData } = stockSlice.actions;
export default stockSlice.reducer;
