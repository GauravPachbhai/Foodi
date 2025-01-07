"use client";
import Footer from "@/_component/Footer";
import Header from "@/_component/Header";
import FoodCatg from "@/_component/FoodCatg.js";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Home() {
  const [showAll, setShowAll] = useState(false);

  // Function to toggle between showing one row and all rows
  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <Header />
      <div className="flex flex-col items-center mt-20 min-h-54 gap-y-10">

        <div className="flex p-2 mt-10 justify-center items-center rounded-full h-12 text-black opacity-45 w-3/6 bg-white shadow-lg fixed">
          <div className="p-2 text-black">
            <Search />
          </div>

          <input
            className="w-full h-full p-2 rounded-full border-none outline-none"
            type="search"
            placeholder="Search for Restaurant or dishes"
          />
        </div>

        {/* Food Categories */}
        <div className="w-full mt-28">
          <div className="flex  items-center">
            <h2 className="text-2xl font-semibold">Food Categories</h2>
            <button
              className="px-4 py-2 text-gray-600 rounded-full hover:bg-orange-500 hover:text-gray-800 ml-4"
              onClick={toggleShowAll}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Scrollable Food Categories */}
          <div className="mt-4 max-h-96 w-full overflow-y-auto p-4 bg-white scrollbar-hide">
            <FoodCatg showAll={showAll} />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
