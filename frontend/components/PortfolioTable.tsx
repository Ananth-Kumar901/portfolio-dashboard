import React from 'react';
import { PortfolioStock } from '../utils/types';

interface Props {
  data: PortfolioStock[];
}

const PortfolioTable: React.FC<Props> = ({ data }) => {
  const sectors = Array.from(new Set(data.map(d => d.sector)));

  return (
    <div className="space-y-12">
      {sectors.map(sector => {
        const sectorStocks = data.filter(d => d.sector === sector);
        const totalInvestment = sectorStocks.reduce((sum, s) => sum + s.investment, 0);
        const totalPresentValue = sectorStocks.reduce((sum, s) => sum + (s.presentValue || 0), 0);
        const totalGainLoss = totalPresentValue - totalInvestment;

        return (
          <div key={sector} className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">{sector}</h2>
            <div className="flex flex-wrap gap-8 mb-6 text-base">
              <span>
                <span className="font-semibold">Total Investment:</span> ₹{totalInvestment.toLocaleString()}
              </span>
              <span>
                <span className="font-semibold">Total Present Value:</span> ₹{totalPresentValue.toLocaleString()}
              </span>
              <span className={totalGainLoss >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                Gain/Loss: ₹{totalGainLoss.toLocaleString()}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-100 text-left rounded-tl-lg">Stock</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Purchase Price</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Qty</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Investment</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Portfolio %</th>
                    <th className="px-4 py-3 bg-gray-100 text-left">Code</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">CMP</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Present Value</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">Gain/Loss</th>
                    <th className="px-4 py-3 bg-gray-100 text-right">P/E Ratio</th>
                    <th className="px-4 py-3 bg-gray-100 text-right rounded-tr-lg">Latest Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {sectorStocks.map((stock, idx) => (
                    <tr
                      key={stock.name}
                      className={`transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}
                    >
                      <td className="px-4 py-2 rounded-l-lg">{stock.name}</td>
                      <td className="px-4 py-2 text-right">₹{stock.purchasePrice}</td>
                      <td className="px-4 py-2 text-right">{stock.quantity}</td>
                      <td className="px-4 py-2 text-right">₹{stock.investment}</td>
                      <td className="px-4 py-2 text-right">{stock.portfolioPercent}%</td>
                      <td className="px-4 py-2">{stock.exchangeCode}</td>
                      <td className="px-4 py-2 text-right">
                        {stock.cmp !== null && stock.cmp !== undefined ? `₹${stock.cmp}` : '-'}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {stock.presentValue !== undefined ? `₹${stock.presentValue}` : '-'}
                      </td>
                      <td
                        className={`px-4 py-2 text-right font-semibold ${
                          stock.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {stock.gainLoss !== undefined ? `₹${stock.gainLoss}` : '-'}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {stock.peRatio !== null && stock.peRatio !== undefined ? stock.peRatio : '-'}
                      </td>
                      <td className="px-4 py-2 text-right rounded-r-lg">
                        {stock.earnings !== null && stock.earnings !== undefined ? stock.earnings : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioTable;