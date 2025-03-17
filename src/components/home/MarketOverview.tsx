
import { useState } from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { stockData, formatPercentage, getChangeClass } from '@/utils/stockData';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const MarketOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const topGainers = [...stockData].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);
  const topLosers = [...stockData].sort((a, b) => a.changePercent - b.changePercent).slice(0, 4);
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Market Overview</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get real-time insights into stock performance, trends, and market movements to inform your investment strategy.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <TabsList className="bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 h-4 w-4" />
                <Input
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-primary"
                />
              </div>
            </div>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStocks.slice(0, 6).map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gainers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topGainers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="losers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topLosers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View All Stocks
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StockCardProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    sector: string;
  };
}

const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  
  return (
    <Link to="/" className="block">
      <div className="glass-card group cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {stock.sector}
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
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
      </div>
    </Link>
  );
};

export default MarketOverview;
