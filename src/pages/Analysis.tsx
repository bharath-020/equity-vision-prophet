
import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, BarChart4 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analysis = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Analysis Tools",
      description: "Advanced stock market analysis tools.",
    });
  }, [toast]);

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
            <h1 className="text-3xl font-bold mt-4">Market Analysis</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Powerful tools to analyze market trends and patterns
            </p>
          </div>
          
          <Tabs defaultValue="technical">
            <TabsList className="mb-8">
              <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
              <TabsTrigger value="fundamental">Fundamental Analysis</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalysisCard 
                  title="Moving Averages"
                  description="Track and analyze moving averages for stocks"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Support & Resistance"
                  description="Identify key support and resistance levels"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Bollinger Bands"
                  description="Volatility bands for technical analysis"
                  icon={<BarChart4 />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="fundamental" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalysisCard 
                  title="Financial Ratios"
                  description="P/E, P/B, and other key financial ratios"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Earnings Reports"
                  description="Quarterly and annual earnings analysis"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Balance Sheets"
                  description="Review company financial statements"
                  icon={<BarChart4 />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="sentiment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalysisCard 
                  title="News Sentiment"
                  description="Analysis of news sentiment for stocks"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Social Media Trends"
                  description="Track social media mentions and sentiment"
                  icon={<BarChart4 />}
                />
                <AnalysisCard 
                  title="Analyst Ratings"
                  description="Aggregated analyst ratings and forecasts"
                  icon={<BarChart4 />}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const AnalysisCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="text-primary h-8 w-8">{icon}</div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
        <Link 
          to="#"
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Learn more
        </Link>
      </CardContent>
    </Card>
  );
};

export default Analysis;
