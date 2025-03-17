
import { useState, useEffect } from 'react';
import { SearchIcon, X, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { searchStocks, StockData, getChangeClass } from '@/utils/stockData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StockChart } from '../charts/StockChart';
import { useToast } from "@/components/ui/use-toast";

const StockSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (query.length > 1) {
      setIsSearching(true);
      setResults(searchStocks(query));
    } else {
      setIsSearching(false);
      setResults([]);
    }
  }, [query]);

  const handleStockSelect = (stock: StockData) => {
    setSelectedStock(stock);
    setQuery('');
    setIsSearching(false);
    toast({
      title: "Stock Selected",
      description: `${stock.name} (${stock.symbol}) has been loaded.`,
      duration: 3000,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Search & Analyze Stocks</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search for any stock to get detailed information, charts, and price predictions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="flex items-center">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by symbol or company name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 py-6 text-lg shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
                />
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <Button className="ml-2 py-6 px-6">
                Search
              </Button>
            </div>

            {isSearching && results.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 z-10 max-h-80 overflow-y-auto glass">
                <ul className="py-2">
                  {results.map((stock) => (
                    <li key={stock.symbol}>
                      <button
                        onClick={() => handleStockSelect(stock)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</div>
                        </div>
                        <div className="flex items-center">
                          <span className="font-mono">${stock.price.toFixed(2)}</span>
                          <span className={`ml-2 flex items-center ${getChangeClass(stock.change)}`}>
                            {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isSearching && query.length > 1 && results.length === 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 z-10 glass">
                <div className="px-4 py-6 text-center text-gray-600 dark:text-gray-400">
                  No stocks found matching "{query}"
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedStock ? (
          <div className="max-w-4xl mx-auto animate-scale-up">
            <div className="glass-card mb-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div>
                  <div className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mb-2">
                    {selectedStock.sector}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold flex items-center">
                    {selectedStock.name} 
                    <span className="ml-2 text-gray-500 dark:text-gray-400">({selectedStock.symbol})</span>
                  </h3>
                  <div className="mt-2 flex items-center text-lg md:text-xl font-mono">
                    <span className="font-semibold">${selectedStock.price.toFixed(2)}</span>
                    <span className={`ml-3 flex items-center ${getChangeClass(selectedStock.change)}`}>
                      {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                      {selectedStock.change >= 0 ? <TrendingUp className="h-4 w-4 ml-1" /> : <TrendingDown className="h-4 w-4 ml-1" />}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="px-5 py-2 h-10">
                    <span>Full Analysis</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="h-64 md:h-80">
                <StockChart symbol={selectedStock.symbol} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StockMetricCard
                title="Market Cap"
                value={formatCurrency(selectedStock.marketCap)}
                className="bg-blue-50 dark:bg-blue-900/20"
              />
              <StockMetricCard
                title="Volume"
                value={formatNumber(selectedStock.volume)}
                className="bg-purple-50 dark:bg-purple-900/20"
              />
              <StockMetricCard
                title="52-Week Range"
                value={`$${selectedStock.low52Week.toFixed(2)} - $${selectedStock.high52Week.toFixed(2)}`}
                className="bg-amber-50 dark:bg-amber-900/20"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="glass-card flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Stock Selected</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Search for a stock above to view detailed information and analysis.
              </p>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleStockSelect(stockData[0])}
                >
                  Try AAPL
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleStockSelect(stockData[5])}
                >
                  Try NVDA
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface StockMetricCardProps {
  title: string;
  value: string;
  className?: string;
}

const StockMetricCard = ({ title, value, className = "" }: StockMetricCardProps) => {
  return (
    <div className={`glass-card ${className}`}>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
};

// Utility functions
const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
};

const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  } else {
    return value.toLocaleString();
  }
};

export default StockSearch;
