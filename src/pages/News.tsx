
import { useEffect, useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Calendar, Newspaper, TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cut in Coming Months",
    summary: "Federal Reserve officials indicated they could begin cutting interest rates in the coming months if inflation continues to cool, minutes from their latest meeting showed.",
    source: "Market Watch",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "positive",
    category: "economy"
  },
  {
    id: 2,
    title: "Tech Stocks Rally as Earnings Beat Expectations",
    summary: "Major technology companies reported stronger-than-expected quarterly earnings, driving a rally in the tech sector and pushing the Nasdaq to new heights.",
    source: "Financial Times",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "positive",
    category: "technology"
  },
  {
    id: 3,
    title: "Oil Prices Drop Amid Concerns Over Global Demand",
    summary: "Crude oil prices fell sharply as investors worried about weakening global demand and increasing supply from major producers.",
    source: "Reuters",
    time: "8 hours ago",
    image: "https://images.unsplash.com/photo-1518381089816-b7f3927241c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "negative",
    category: "commodities"
  },
  {
    id: 4,
    title: "Retail Sales Decline for Second Consecutive Month",
    summary: "Consumer spending at retailers fell unexpectedly for the second month in a row, raising concerns about the strength of the economic recovery.",
    source: "Bloomberg",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "negative",
    category: "retail"
  },
  {
    id: 5,
    title: "Healthcare Sector Gains on Positive Drug Trial Results",
    summary: "Shares of major pharmaceutical companies rose after promising results from late-stage clinical trials for a potential breakthrough treatment.",
    source: "Wall Street Journal",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "positive",
    category: "healthcare"
  },
  {
    id: 6,
    title: "Housing Market Shows Signs of Cooling as Mortgage Rates Rise",
    summary: "The red-hot housing market appears to be cooling off as mortgage rates climb to their highest levels in years, reducing affordability for potential homebuyers.",
    source: "CNBC",
    time: "2 days ago",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    sentiment: "neutral",
    category: "realestate"
  },
];

const News = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    toast({
      title: "Market News",
      description: "Latest financial news and market updates.",
    });
  }, [toast]);

  // Filter news based on active tab
  const filteredNews = activeTab === "all" 
    ? newsData 
    : newsData.filter(item => {
        if (activeTab === "positive") return item.sentiment === "positive";
        if (activeTab === "negative") return item.sentiment === "negative";
        return item.category === activeTab;
      });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mt-4">Market News</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Stay updated with the latest financial news and market insights
            </p>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="all">All News</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="negative">Negative</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="economy">Economy</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Today, {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const NewsCard = ({ news }: { news: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${news.image})` }}
        >
        </div>
        <div className="absolute top-3 right-3">
          {news.sentiment === "positive" && (
            <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full px-2 py-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Positive
            </div>
          )}
          {news.sentiment === "negative" && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs rounded-full px-2 py-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              Negative
            </div>
          )}
          {news.sentiment === "neutral" && (
            <div className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-1 flex items-center">
              Neutral
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Newspaper className="h-3 w-3 mr-1" />
          <span className="mr-3">{news.source}</span>
          <Clock className="h-3 w-3 mr-1" />
          <span>{news.time}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2">{news.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {news.summary}
        </p>
        
        <Link 
          to="#" 
          className="inline-flex items-center text-primary text-sm font-medium hover:underline"
        >
          Read Full Story
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default News;
