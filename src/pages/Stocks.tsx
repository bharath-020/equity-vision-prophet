
import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import StockSearch from "@/components/home/StockSearch";

const Stocks = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Stocks Page",
      description: "Explore and search for individual stocks.",
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
            <h1 className="text-3xl font-bold mt-4">Stock Explorer</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Search and analyze individual stocks
            </p>
          </div>
          
          <StockSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stocks;
