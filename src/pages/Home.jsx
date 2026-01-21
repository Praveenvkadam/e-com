import React from "react";
import Navbar from "@/components/Navbar";
import ProductsGrid from "@/components/ProductsGrid";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
        <Navbar />
        
        <div className="px-4 sm:px-6 lg:px-10 pb-10">
          <ProductsGrid />
        </div>
      </div>
  );
};

export default Home;
