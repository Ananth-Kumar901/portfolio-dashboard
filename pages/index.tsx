import React, { useEffect, useState } from 'react';
import PortfolioTable from '../components/PortfolioTable';
import { fetchPortfolio } from '../utils/helpers';
import { PortfolioStock } from '../utils/types';

const Home: React.FC = () => {
  const [data, setData] = useState<PortfolioStock[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const portfolio = await fetchPortfolio();
      setData(portfolio);
      setError(null);
    } catch (e) {
      setError('Failed to fetch portfolio data.');
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="p-8 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">Dynamic Portfolio Dashboard</h1>
    {error && <div className="text-red-600 mb-4">{error}</div>}
    <PortfolioTable data={data} />
  </div>
);
};

export default Home;