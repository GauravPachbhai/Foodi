"use client";

function MenuItemComponent({ name, description, price, image }) {
    return (
        <div className="flex shadow-md w-96 justify-between h-44 items-center rounded-sm sm:w-80 md:w-96">
            {/* Description */}
            <div className="p-2 flex flex-col">
                <span className="font-semibold text-lg p-2">{name}</span>
                <span className="text-sm text-gray-600">{description}</span>
                <span className="p-2 text-green-600 font-semibold">₹{price}</span>
                <div className="flex border justify-between items-center border-red-500 rounded-md w-20">
                    <button className="p-1 w-1/3 active:bg-red-400 focus:outline-none">-</button>
                    <span className="bg-red-500 rounded-sm p-1 text-xs text-white">ADD</span>
                    <button className="p-1 w-1/3 active:bg-red-400 focus:outline-none">+</button>
                </div>
            </div>
            {/* Item Image */}
            <div className="p-2">
                <img src={image} alt={`${name} image`} className="w-28 h-28 rounded-full" />
            </div>
        </div>
    );
}

export default MenuItemComponent;
