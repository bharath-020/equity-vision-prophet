
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import MarketOverview from "@/components/home/MarketOverview";
import StockSearch from "@/components/home/StockSearch";
import Pricing from "@/components/home/Pricing";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MarketOverview />
        <StockSearch />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
