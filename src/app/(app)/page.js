"use client"
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
    <div className="justify-center">
      <Header />
      <div className="flex flex-col items-center mt-20 min-h-screen">

        <div className="flex p-2 mt-10  justify-center items-center rounded-full h-12 text-black opacity-45  w-3/6 bg-white shadow-lg">
          <div className="p-2 text-black"> <Search /></div>

          <input
            className="w-full h-full p-2 rounded-full border-none outline-none"
            type="search"
            placeholder="Search for Restaurant or dishes"
          />

        </div>

        {/* Food Categories*/}
        <div className="w-fit mt-4 ">
          <div className=" flex justify-between w-full ">
            <h2 className="text-2xl font-semibold  mt-2 ">Food Categories</h2>
            {/* Show More / Show Less button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={toggleShowAll}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Food categories with conditional row display */}
          <FoodCatg showAll={showAll} />
        </div>


      </div>
      <Footer />
    </div>
  );
}
