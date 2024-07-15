// src/pages/index.tsx
'use client'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setStocks, setCurrentStock, setStockData } from '../redux/features/stock/stockSlice';
import Modal from '../components/Modal';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, data, currentStock } = useSelector((state: RootState) => state.stock);
  const [isModalOpen, setIsModalOpen] = useState(!currentStock);

  useEffect(() => {
    const fetchAllStocks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/fetchAll`);
        dispatch(setStocks(response.data));
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      }
    };

    fetchAllStocks();
  }, [dispatch]);

  useEffect(() => {
    const fetchStockData = async () => {
      if (currentStock) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/fetchByCode/${currentStock}`);
          dispatch(setStockData(response.data.rates));
        } catch (error) {
          console.error('Failed to fetch stock data:', error);
        }
      }
    };

    fetchStockData();
  }, [currentStock, dispatch]);

  const handleStockChange = (code: string) => {
    dispatch(setCurrentStock(code));
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Stock Data</h1>
      <button onClick={() => setIsModalOpen(true)}>Change Stock</button>
      <table>
        <thead>
          <tr>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rate:number, index:number) => (
            <tr key={index}>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <Modal stocks={stocks} onSelect={handleStockChange} currentStock={currentStock} />}
    </div>
  );
};

export default Home;
