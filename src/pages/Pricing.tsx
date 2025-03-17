
import { useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PricingComponent from "@/components/home/Pricing";

const Pricing = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Pricing Plans",
      description: "Explore our subscription options.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Subscription Plans</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the plan that best fits your investment needs and goals
            </p>
          </div>
          
          <PricingComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
