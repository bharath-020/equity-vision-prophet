
import { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { indexData, indexChartData, ChartDataPoint, formatPercentage, getChangeClass } from '@/utils/stockData';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [animatedIndex, setAnimatedIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex((prev) => (prev + 1) % indexData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10 animated-gradient"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 animate-float animate-delay-200"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                Advanced Market Insights
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance mb-4">
                Analyze & Predict <br/>Stock Market <span className="text-primary">Trends</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg text-pretty">
                Get powerful insights, real-time analytics, and predictive indicators to help you make more informed investment decisions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/"
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium transition-all duration-200 hover:bg-primary/90 active:scale-95 flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95"
              >
                View Demo
              </Link>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Trusted by leading investment professionals
              </p>
              <div className="flex flex-wrap gap-6 items-center opacity-70">
                <div className="h-6 w-20 bg-gray-900 dark:bg-gray-100 rounded"></div>
                <div className="h-8 w-24 bg-gray-900 dark:bg-gray-100 rounded"></div>
                <div className="h-6 w-28 bg-gray-900 dark:bg-gray-100 rounded"></div>
                <div className="h-7 w-20 bg-gray-900 dark:bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-12 animate-fade-in animate-delay-200">
            <div className="glass-card">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Market Snapshot</h2>
                <div className="flex flex-col space-y-4">
                  {indexData.map((index, idx) => (
                    <div 
                      key={index.symbol}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        idx === animatedIndex ? 'bg-gray-100/50 dark:bg-gray-800/50' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{index.name}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {index.symbol}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <MiniChart 
                          data={indexChartData[index.symbol]} 
                          color={index.change >= 0 ? '#34D399' : '#F87171'} 
                          isActive={idx === animatedIndex}
                        />
                      </div>
                      
                      <div className="text-right">
                        <div className="font-mono font-medium">
                          {index.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                        <div className={`text-sm font-mono flex items-center justify-end ${getChangeClass(index.change)}`}>
                          {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                          <span className="ml-1">{formatPercentage(index.changePercent)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-2">
                <Link 
                  to="/" 
                  className="flex items-center justify-center text-primary font-medium transition-colors hover:text-primary/80"
                >
                  View All Markets
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MiniChart = ({ data, color, isActive }: { data: ChartDataPoint[]; color: string; isActive: boolean }) => {
  // Get min and max values for scaling
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  // Scale points to fit in the available height
  const height = 40;
  const width = 120;
  const points = data.map((point, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((point.value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className={`w-[120px] h-[40px] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none">
        <polyline
          points={points}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={isActive ? 'animate-pulse' : ''}
        />
      </svg>
    </div>
  );
};

export default Hero;
