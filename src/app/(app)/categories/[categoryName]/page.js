"use client";

import Header from "@/_component/Header";
import MenuItemComponent from "@/_component/MenuItemComponent";
import axios from "axios";
import { useEffect, useState } from "react";

const MenuItem = [
  "Burger",
  "Chicken",
  "Pizza",
  "Pasta",
  "Salads",
  "Sushi",
  "Desserts",
  "Chinese",
  "Seafood",
  "Drinks",
  "Sandwiches",
];

export default function Page({ params }) {
  const { categoryName } = params; // Dynamic parameter
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryName);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const response = await axios.get(
          `http://localhost:3000/api/returant/menu-items/${activeCategory}`
        );
        setMenuItems(response.data.data);
      } catch (err) {
        setError("Failed to fetch menu items. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-y-4">
      {/* Header */}
      <div className="h-20">
        <Header />
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-10/12 ml-36">
        {/* Menu Sidebar */}
        <div className="border flex flex-col border-gray-300 rounded-md bg-gray-50 w-52 fixed ">
          <div className="flex p-3">
            <h1 className="flex items-center gap-1 font-bold text-2xl">
              <img
                src="https://i.ibb.co/dJRk0DV/Restaurant-Menu.png"
                alt="Menu Icon"
                className="h-8"
              />
              Menu
            </h1>
          </div>
          {MenuItem.map((item) => (
            <div
              key={item}
              className={`p-3 cursor-pointer font-semibold ${activeCategory === item
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
                }`}
              onClick={() => setActiveCategory(item)}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
        {/* Items Section */}
        <div className="flex flex-col gap-4 p-4 w-full lg:pl-56 lg:w-3/4">
          {isLoading ? (
            <p>Loading menu items...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <div key={index} className="w-fit">
                <MenuItemComponent
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))
          ) : (
            <p>No items found for {activeCategory}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
