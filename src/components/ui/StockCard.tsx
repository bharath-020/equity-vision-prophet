
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { StockData, getChangeClass, formatPercentage } from '@/utils/stockData';

interface StockCardProps {
  stock: StockData;
  showDetails?: boolean;
}

export const StockCard = ({ stock, showDetails = false }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  
  return (
    <Link to="/" className="block">
      <div className="glass-card group cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {stock.sector}
            </div>
            <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
              {stock.symbol}
            </h3>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {stock.name}
            </div>
          </div>
          <div className={`rounded-full p-2 ${isPositive ? 'bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400'}`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div>
            <div className="text-2xl font-mono font-semibold">
              ${stock.price.toFixed(2)}
            </div>
            <div className={`text-sm font-mono ${getChangeClass(stock.change)}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({formatPercentage(stock.changePercent)})
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-primary transition-colors">
            <ArrowUpRight />
          </div>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Volume
              </div>
              <div className="font-medium">
                {(stock.volume / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Market Cap
              </div>
              <div className="font-medium">
                ${(stock.marketCap / 1000000000).toFixed(2)}B
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
