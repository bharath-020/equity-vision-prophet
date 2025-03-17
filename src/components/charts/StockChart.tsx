
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChartDataPoint, stockChartData, indexChartData, getStockBySymbol } from '@/utils/stockData';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y';

interface StockChartProps {
  symbol: string;
}

export const StockChart = ({ symbol }: StockChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Get data based on symbol (could be a stock or index)
    setTimeout(() => {
      const data = stockChartData[symbol] || indexChartData[symbol] || [];
      
      // Slice data based on time range
      let filteredData = data;
      if (timeRange === '1D') filteredData = data.slice(-2);
      if (timeRange === '1W') filteredData = data.slice(-7);
      if (timeRange === '1M') filteredData = data;
      if (timeRange === '3M') filteredData = data;
      if (timeRange === '1Y') filteredData = data;
      
      setChartData(filteredData);
      setIsLoading(false);
    }, 500);
  }, [symbol, timeRange]);
  
  const stockInfo = getStockBySymbol(symbol);
  const isPositive = stockInfo ? stockInfo.change >= 0 : true;
  const color = isPositive ? '#34D399' : '#F87171';
  
  // Calculate minimum and maximum for YAxis
  const values = chartData.map(item => item.value);
  const min = Math.min(...values) * 0.995;
  const max = Math.max(...values) * 1.005;
  
  // Format tooltip label
  const formatTooltipLabel = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 text-xs">{formatTooltipLabel(label)}</p>
          <p className="font-medium font-mono text-base">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-medium">Price Chart</div>
        <div className="flex space-x-1">
          {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as TimeRange)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-[calc(100%-32px)]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                tickFormatter={(date) => {
                  if (timeRange === '1D' || timeRange === '1W') {
                    return new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
                  }
                  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
                minTickGap={30}
              />
              <YAxis 
                domain={[min, max]} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                width={50}
                orientation="right"
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={chartData[0]?.value} stroke="#888" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: color, strokeWidth: 0 }}
                animationDuration={500}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
