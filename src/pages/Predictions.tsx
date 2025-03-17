
import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, TrendingUp, TrendingDown, BrainCircuit, Sigma } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Predictions = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "AI Predictions",
      description: "Market predictions powered by machine learning.",
    });
  }, [toast]);

  const handleGeneratePrediction = () => {
    toast({
      title: "Generating Prediction",
      description: "Our AI models are analyzing market data...",
    });
  };

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
            <h1 className="text-3xl font-bold mt-4">Market Predictions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              AI-powered predictions to help guide your investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI Market Prediction Models</CardTitle>
                </div>
                <CardDescription>
                  Our advanced machine learning algorithms analyze historical data, market trends, and news sentiment to predict market movements.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Short-term</h3>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1-7 day forecasts with 78% accuracy</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Medium-term</h3>
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1-3 month projections with 72% accuracy</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleGeneratePrediction}
                >
                  Generate Prediction
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Sigma className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Model Accuracy & Performance</CardTitle>
                </div>
                <CardDescription>
                  Track the historical performance of our prediction models and their accuracy rates over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Basic Model</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Advanced Model</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enterprise Model</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    toast({
                      title: "Model Details",
                      description: "Detailed model information is available with a Pro subscription.",
                    });
                  }}
                >
                  View Detailed Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Predictions;
