
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import MarketOverview from "@/components/home/MarketOverview";
import StockSearch from "@/components/home/StockSearch";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MarketOverview />
        <StockSearch />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
