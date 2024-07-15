
'use client'
import { useState, useEffect } from 'react';

interface ModalProps {
  stocks: { code: string; name: string }[];
  onSelect: (code: string) => void;
  currentStock: string;
}

const Modal: React.FC<ModalProps> = ({ stocks, onSelect, currentStock }) => {
  const [selectedStock, setSelectedStock] = useState(currentStock);

  useEffect(() => {
    setSelectedStock(currentStock);
  }, [currentStock]);

  return (
    <div className="modal">
      <h2>Select Stock</h2>
      <select onChange={(e) => setSelectedStock(e.target.value)} value={selectedStock}>
        <option value="" disabled>Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock.code} value={stock.code}>
            {stock.name} ({stock.code})
          </option>
        ))}
      </select>
      <button onClick={() => onSelect(selectedStock)}>Select</button>
    </div>
  );
};

export default Modal;
