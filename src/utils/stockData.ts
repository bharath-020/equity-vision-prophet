
// Mock data for stocks and market
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  high52Week: number;
  low52Week: number;
}

export interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

// Simulated historical data for charts (1 month of daily data)
export const generateChartData = (
  baseValue: number,
  volatility: number = 0.02,
  daysBack: number = 30
): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentValue = baseValue;
  
  const now = new Date();
  
  for (let i = daysBack; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk with some trend
    const change = currentValue * (Math.random() * volatility * 2 - volatility);
    currentValue += change;
    
    // Add some patterns - trends and reversals
    if (i % 7 === 0) {
      currentValue *= Math.random() > 0.5 ? 1.01 : 0.99;
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Number(currentValue.toFixed(2))
    });
  }
  
  return data;
};

// Popular indexes
export const indexData: IndexData[] = [
  {
    symbol: "^DJI",
    name: "Dow Jones",
    value: 38589.2,
    change: 132.5,
    changePercent: 0.34
  },
  {
    symbol: "^GSPC",
    name: "S&P 500",
    value: 5280.1,
    change: -14.2,
    changePercent: -0.27
  },
  {
    symbol: "^IXIC",
    name: "NASDAQ",
    value: 16920.8,
    change: 78.4,
    changePercent: 0.46
  },
  {
    symbol: "^RUT",
    name: "Russell 2000",
    value: 2038.2,
    change: -6.8,
    changePercent: -0.33
  }
];

// Popular stocks
export const stockData: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.68,
    change: 2.85,
    changePercent: 1.54,
    volume: 78560000,
    marketCap: 2943000000000,
    sector: "Technology",
    high52Week: 199.62,
    low52Week: 143.9
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 428.81,
    change: -1.23,
    changePercent: -0.29,
    volume: 23450000,
    marketCap: 3190000000000,
    sector: "Technology",
    high52Week: 430.82,
    low52Week: 309.47
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 175.98,
    change: 3.67,
    changePercent: 2.13,
    volume: 28760000,
    marketCap: 2180000000000,
    sector: "Technology",
    high52Week: 176.42,
    low52Week: 115.35
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 185.27,
    change: -0.96,
    changePercent: -0.52,
    volume: 35920000,
    marketCap: 1920000000000,
    sector: "Consumer Cyclical",
    high52Week: 186.11,
    low52Week: 118.35
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 172.82,
    change: 4.32,
    changePercent: 2.57,
    volume: 124580000,
    marketCap: 550000000000,
    sector: "Consumer Cyclical",
    high52Week: 278.98,
    low52Week: 138.8
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 950.52,
    change: 22.41,
    changePercent: 2.42,
    volume: 45870000,
    marketCap: 2340000000000,
    sector: "Technology",
    high52Week: 974.63,
    low52Week: 342.36
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 481.73,
    change: -3.28,
    changePercent: -0.68,
    volume: 18950000,
    marketCap: 1230000000000,
    sector: "Technology",
    high52Week: 485.96,
    low52Week: 274.38
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    price: 198.48,
    change: 1.23,
    changePercent: 0.62,
    volume: 8340000,
    marketCap: 571000000000,
    sector: "Financial Services",
    high52Week: 200.94,
    low52Week: 135.19
  }
];

// Function to get a stock by symbol
export const getStockBySymbol = (symbol: string): StockData | undefined => {
  return stockData.find(stock => stock.symbol === symbol);
};

// Function to search stocks by symbol or name
export const searchStocks = (query: string): StockData[] => {
  if (!query) return stockData;
  
  const lowerQuery = query.toLowerCase();
  return stockData.filter(
    stock => 
      stock.symbol.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
  );
};

// Generate chart data for each stock
export const stockChartData = stockData.reduce((acc, stock) => {
  acc[stock.symbol] = generateChartData(stock.price, 0.015);
  return acc;
}, {} as Record<string, ChartDataPoint[]>);

// Generate chart data for indexes
export const indexChartData = indexData.reduce((acc, index) => {
  acc[index.symbol] = generateChartData(index.value, 0.01);
  return acc;
}, {} as Record<string, ChartDataPoint[]>);

// Function to format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
};

// Function to format percentages
export const formatPercentage = (num: number): string => {
  return num > 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`;
};

// Function to get style class based on change value
export const getChangeClass = (change: number): string => {
  if (change > 0) return "text-market-positive";
  if (change < 0) return "text-market-negative";
  return "text-market-neutral";
};
